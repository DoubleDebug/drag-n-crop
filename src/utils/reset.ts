import {
  stage,
  isImage,
  rawFileUrl,
  croppedFilePath,
  rawStoragePath,
  croppedStoragePath,
  uploadPercentage,
  reasonInvalid,
  reasonUploadFail,
  jcrop,
  timeElapsed,
  reasonCropFail,
  reasonDownloadFail,
  originalFileSize,
  croppedFileSize,
} from '../stores/state';

export function resetState() {
  stage.set('ready-to-upload');
  isImage.set(true);
  rawFileUrl.set(null);
  croppedFilePath.set(null);
  rawStoragePath.set(null);
  croppedStoragePath.set(null);
  uploadPercentage.set(0);
  reasonInvalid.set(null);
  reasonUploadFail.set(null);
  reasonCropFail.set(null);
  reasonDownloadFail.set(null);
  jcrop.set(null);
  timeElapsed.set(0);
  originalFileSize.set(null);
  croppedFileSize.set(null);
}
