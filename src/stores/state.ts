import { derived, writable } from 'svelte/store';
import type { AppStage } from '../app';

// application state
export const stage = writable<AppStage>('ready-to-upload');
export const isImage = writable<boolean>(true);
export const rawFileUrl = writable<string | null>(null);
export const croppedFilePath = writable<string | null>(null);
export const rawStoragePath = writable<string | null>(null);
export const croppedStoragePath = writable<string | null>(null);
export const uploadPercentage = writable<string>('0');
export const jcrop = writable<any>(null);
export const timeElapsed = writable<number>(0); // in milliseconds

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
    default:
      return $stage;
  }
});
