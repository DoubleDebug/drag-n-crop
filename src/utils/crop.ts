import type Cropper from 'cropperjs';
import { CropApi } from '../api/crop';
import { FileApi } from '../api/file';
import { FirebaseStorageApi } from '../api/firebase-storage';
import type { CropOptions, HandleCropOptions } from '../app';
import {
  croppedFilePath,
  croppedFileSize,
  croppedStoragePath,
  reasonCropFail,
  stage,
} from '../stores/state';
import { ID_VIDEO_ELEMENT } from './constant';

export namespace CropUtils {
  export async function handleCrop(options: HandleCropOptions) {
    const { cropper, isImage, uploadType } = options;
    if (!cropper) return;
    if (
      (uploadType === 'file' && !options.storagePath) ||
      (uploadType === 'url' && !options.url)
    ) {
      stage.set('failed-to-crop');
      reasonCropFail.set("The file wasn't uploaded correctly.");
      return;
    }

    // start cropping
    stage.set('cropping');

    // calculate real coordinates
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } =
      getMediaDimensions(isImage, cropper);
    const widthPercentage = clientWidth / naturalWidth;
    const heightPercentage = clientHeight / naturalHeight;
    const { width, height, left, top } = cropper.getCropBoxData();
    let w = Math.round(width / widthPercentage);
    let h = Math.round(height / heightPercentage);
    const x = Math.round(left / widthPercentage);
    const y = Math.round(top / heightPercentage);

    // edge case: overflowing width/height
    if (w + x > naturalWidth) {
      w = naturalWidth - x;
    }
    if (h + y > naturalHeight) {
      h = naturalHeight - y;
    }

    // prepare data
    let commonData: Partial<CropOptions> = {
      dimensions: {
        top_left_point: { x, y },
        size: { width: w, height: h },
      },
    };
    if (uploadType === 'file') {
      commonData = {
        ...commonData,
        storage_file_path: options.storagePath,
      };
    } else {
      commonData = {
        ...commonData,
        url: options.url,
      };
    }
    const data = commonData as CropOptions;

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

  export function getMediaDimensions(isImage: boolean, cropper: Cropper) {
    if (isImage) {
      const imageData = cropper.getImageData();
      return {
        naturalWidth: imageData.naturalWidth,
        naturalHeight: imageData.naturalHeight,
        clientWidth: imageData.width,
        clientHeight: imageData.height,
      };
    } else {
      const videoElement = document.getElementById(
        ID_VIDEO_ELEMENT
      ) as HTMLVideoElement;
      return {
        naturalWidth: videoElement.videoWidth,
        naturalHeight: videoElement.videoHeight,
        clientWidth: videoElement.clientWidth,
        clientHeight: videoElement.clientHeight,
      };
    }
  }
}
