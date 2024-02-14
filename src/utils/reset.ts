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
  cropper,
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
  cropper.set(null);
  timeElapsed.set(0);
  originalFileSize.set(null);
  croppedFileSize.set(null);
}
