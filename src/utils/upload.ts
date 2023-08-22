import { CropApi } from '../api/crop';
import { FileApi } from '../api/file';
import { FirebaseStorageApi } from '../api/firebase-storage';
import { UrlHelper } from '../api/url';
import {
  isImage as state_isImage,
  originalFileSize,
  rawFileUrl,
  rawStoragePath,
  reasonInvalid,
  reasonUploadFail,
  stage,
  uploadPercentage,
  originalFileName,
  isImage,
} from '../stores/state';

export function setAllowedExtensions(container: HTMLDivElement) {
  const inputs = container.getElementsByTagName('input');
  if (inputs.length !== 1) return;

  const allowedExtensions = [
    ...FileApi.validImageFormats,
    ...FileApi.validVideoFormats,
  ].join(', ');
  inputs[0].accept = allowedExtensions;
}

export function handleUploadFile(file: any) {
  // validate file foromat
  const validation = FileApi.isFileValid(file);
  if (!validation.isValid) {
    stage.set('failed-to-upload');
    reasonInvalid.set(validation.reason);
    return;
  }

  state_isImage.set(validation.isImage);
  stage.set('uploading');
  const fileSize = (file as File).size / (1024 * 1024);
  originalFileSize.set(fileSize.toFixed(2));
  originalFileName.set(file.name);

  // upload file
  const path = FirebaseStorageApi.uploadFile({
    file,
    isImage: validation.isImage,
    onStateChange: (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const progressFormatted = Math.round(progress);
      uploadPercentage.set(progressFormatted);
    },
    onSuccess: (url) => {
      rawFileUrl.set(url);
      stage.set('ready-to-crop');
    },
    onError: (error) => {
      reasonUploadFail.set('Error code: ' + error.code);
      stage.set('failed-to-upload');
    },
  });
  rawStoragePath.set(path);
}

export async function handleUploadFromUrl(url: string | null) {
  if (!url) return;

  // update state
  stage.set('uploading');
  isImage.set(UrlHelper.isImageUrl(url));
  originalFileName.set(UrlHelper.getFilename(url));

  // mimic upload progress
  let isUploadDone = false;
  setTimeout(() => {
    if (!isUploadDone) {
      uploadPercentage.set(50);
    }
  }, 1000);

  // send upload request to server
  const uploadResponse = await CropApi.uploadMedia({ url }).catch((error) => {
    console.log('Uploading media error:', JSON.stringify(error));
    reasonUploadFail.set(
      'There was an error while uploading the media file to the server.'
    );
  });
  isUploadDone = true;

  // handle response
  if (uploadResponse && uploadResponse.success) {
    stage.set('ready-to-crop');
    const storagePath = uploadResponse.data;
    const downloadUrl = await FirebaseStorageApi.getDownloadUrl(storagePath);
    rawFileUrl.set(downloadUrl);
    FileApi.getFileSizeFromUrl(downloadUrl).then((size) =>
      originalFileSize.set(size)
    );
  } else {
    stage.set('failed-to-upload');
    if (uploadResponse) reasonUploadFail.set(uploadResponse.message);
  }
}
