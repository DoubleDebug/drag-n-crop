import { CropApi } from '$lib/api/crop';
import { FileApi } from '$lib/api/file';
import { FirebaseStorageApi } from '$lib/api/firebase-storage';
import type { CropOptions } from '../app';
import {
  croppedFilePath,
  croppedFileSize,
  croppedStoragePath,
  reasonCropFail,
  stage,
} from '../stores/state';
import { ID_CROP_AREA, ID_VIDEO_ELEMENT } from './constant';

export namespace CropUtils {
  export async function handleCrop(
    jcropRef: any,
    storagePath: string | null,
    isImage: boolean
  ) {
    if (!storagePath) {
      stage.set('failed-to-crop');
      reasonCropFail.set("The file wasn't uploaded correctly.");
      return;
    }

    // start cropping
    stage.set('cropping');

    // calculate real coordinates
    const { mediaElement, naturalWidth, naturalHeight } =
      getMediaElement(isImage);
    if (!mediaElement) {
      stage.set('failed-to-crop');
      reasonCropFail.set('Failed to read the cropping coordinates.');
      return;
    }
    const widthPercentage =
      mediaElement.getBoundingClientRect().width / naturalWidth;
    const heightPercentage =
      mediaElement.getBoundingClientRect().height / naturalHeight;
    let width = Math.round(jcropRef.active.pos.w / widthPercentage);
    let height = Math.round(jcropRef.active.pos.h / heightPercentage);
    const x = Math.round(jcropRef.active.pos.x / widthPercentage);
    const y = Math.round(jcropRef.active.pos.y / heightPercentage);

    if (width + x > naturalWidth) {
      width = naturalWidth - x;
    }
    if (height + y > naturalHeight) {
      height = naturalHeight - y;
    }

    // prepare data
    const data: CropOptions = {
      storage_file_path: storagePath,
      dimensions: {
        top_left_point: { x, y },
        size: { width, height },
      },
    };

    // make request to server
    let response;
    if (isImage) {
      response = await CropApi.cropImage(data).catch((error) => {
        console.log('Cropping error:', error);
        reasonCropFail.set(
          'There was an error while connecting to the server.'
        );
      });
    } else {
      response = await CropApi.cropVideo(data).catch(() => {
        reasonCropFail.set(
          'There was an error while connecting to the server.'
        );
      });
    }

    // handle response
    if (response && response.success) {
      stage.set('ready-to-download');
      croppedStoragePath.set(response.data);
      FirebaseStorageApi.getDownloadUrl(response.data).then((url) => {
        croppedFilePath.set(url);
        FileApi.getFileSizeFromUrl(url).then((fileSize) => {
          croppedFileSize.set(fileSize);
        });
      });
    } else {
      stage.set('failed-to-crop');
      if (response) {
        reasonCropFail.set(response.message);
      } else {
        reasonCropFail.set(
          'There was an error while connecting to the server.'
        );
      }
    }
  }

  export function getMediaElement(isImage: boolean) {
    const DEFAULT_RESULT = {
      mediaElement: null,
      naturalWidth: 0,
      naturalHeight: 0,
    };

    let mediaElement, naturalWidth, naturalHeight;
    if (isImage) {
      mediaElement = document.getElementById(ID_CROP_AREA) as HTMLImageElement;
      if (!mediaElement) return DEFAULT_RESULT;
      naturalWidth = mediaElement.naturalWidth;
      naturalHeight = mediaElement.naturalHeight;
    } else {
      mediaElement = document.getElementById(
        ID_VIDEO_ELEMENT
      ) as HTMLVideoElement;
      if (!mediaElement) return DEFAULT_RESULT;
      naturalWidth = mediaElement.videoWidth;
      naturalHeight = mediaElement.videoHeight;
    }

    return {
      mediaElement,
      naturalWidth,
      naturalHeight,
    };
  }
}
