import type { StorageError, UploadTaskSnapshot } from 'firebase/storage';

// Types
type AppStage =
  | 'ready-to-upload'
  | 'uploading'
  | 'failed-to-upload'
  | 'ready-to-crop'
  | 'cropping'
  | 'failed-to-crop'
  | 'ready-to-download'
  | 'downloaded';

type UploadOptions = {
  file: File;
  isImage: boolean;
  onSuccess?: (url: string) => unknown;
  onStateChange?: (snapshot: UploadTaskSnapshot) => unknown;
  onError?: (error: StorageError) => unknown;
};

type CropOptions = {
  storage_file_path: string;
  dimensions: {
    top_left_point: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
};

type ApiResult =
  | {
      success: true;
      message: null;
      data: string;
    }
  | {
      success: false;
      message: string;
      data: null;
    };

// JCrop
declare global {
  const Jcrop = {
    Rect: {
      create: (x: number, y: number, w: number, h: number): any => {},
    },
    attach: (id: string, options?: any): any => {},
    newWidget: (rect: any, options?: any): any => {},
  };
}
