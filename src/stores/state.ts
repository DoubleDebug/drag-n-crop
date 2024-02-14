import type Cropper from 'cropperjs';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { derived, writable } from 'svelte/store';
import type { AppStage, FileInvalidReason, UploadType } from '../app';

// application state
export const stage = writable<AppStage>('ready-to-upload');
export const isImage = writable<boolean>(true);
export const uploadType = writable<UploadType>('file');
export const originalFileName = writable<string | null>(null);
export const rawFileUrl = writable<string | null>(null);
export const croppedFilePath = writable<string | null>(null);
export const rawStoragePath = writable<string | null>(null);
export const croppedStoragePath = writable<string | null>(null);
export const uploadPercentage = tweened<number>(0, {
  duration: 1000,
  easing: cubicOut,
});
export const reasonInvalid = writable<FileInvalidReason | null>(null);
export const reasonUploadFail = writable<string | null>(null);
export const reasonCropFail = writable<string | null>(null);
export const reasonDownloadFail = writable<string | null>(null);
export const cropper = writable<Cropper | null>(null);
export const timeElapsed = writable<number>(0); // in seconds
export const originalFileSize = writable<string | null>(null); // in megabytes
export const croppedFileSize = writable<string | null>(null); // in megabytes
export const screenWidth = writable<number>(1920);
export const screenHeight = writable<number>(1024);

// derived state
export const stepNumber = derived(stage, ($stage) => {
  switch ($stage) {
    case 'ready-to-upload':
      return 0;
    case 'uploading':
      return 0;
    case 'failed-to-upload':
      return 0;
    case 'ready-to-crop':
      return 1;
    case 'cropping':
      return 1;
    case 'failed-to-crop':
      return 1;
    case 'ready-to-download':
      return 2;
    case 'downloaded':
      return 3;
    case 'failed-to-download':
      return 3;
    default:
      return $stage;
  }
});
