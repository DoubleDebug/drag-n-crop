import { FileApi } from '$lib/api/file';
import { FirebaseStorageApi } from '$lib/api/firebase-storage';
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

export function handleNewFile(event: any) {
  event.preventDefault();

  // extract file
  const files = event.target?.files || event.dataTransfer?.files;
  if (!files || !files.length || files.length === 0) {
    stage.set('failed-to-upload');
    reasonUploadFail.set(`You didn't select any files.`);
    return;
  }
  const firstFile = files[0];

  // validate file foromat
  const validation = FileApi.isFileValid(firstFile);
  if (!validation.isValid) {
    stage.set('failed-to-upload');
    reasonInvalid.set(validation.reason);
    return;
  }

  state_isImage.set(validation.isImage);
  stage.set('uploading');
  const fileSize = (firstFile as File).size / (1024 * 1024);
  originalFileSize.set(fileSize.toFixed(2));
  originalFileName.set(firstFile.name);

  // upload file
  const path = FirebaseStorageApi.uploadFile({
    file: firstFile,
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
