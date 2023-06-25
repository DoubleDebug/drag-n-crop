import type { StorageError, UploadTaskSnapshot } from 'firebase/storage';

type AppStage =
  | 'ready-to-upload'
  | 'uploading'
  | 'failed-to-upload'
  | 'ready-to-crop'
  | 'cropping'
  | 'failed-to-crop'
  | 'success';

type UploadOptions = {
  file: File;
  isImage: boolean;
  onSuccess?: (url: string) => unknown;
  onStateChange?: (snapshot: UploadTaskSnapshot) => unknown;
  onError?: (error: StorageError) => unknown;
};
