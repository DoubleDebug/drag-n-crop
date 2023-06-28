import { derived, writable } from 'svelte/store';
import type { AppStage } from '../app';

// application state
export const stage = writable<AppStage>('ready-to-upload');
export const isImage = writable<boolean>(true);
export const fileUrl = writable<string | null>(null);
export const storagePath = writable<string | null>(null);
export const uploadPercentage = writable<string>('0');
export const jcrop = writable<any>(null);

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
      return 2;
    case 'failed-to-crop':
      return 2;
    case 'success':
      return 3;
    default:
      return $stage;
  }
});
