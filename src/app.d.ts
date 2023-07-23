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
  | 'failed-to-download'
  | 'downloaded';

type UploadType = 'file' | 'url';

type UploadOptions = {
  isImage: boolean;
  onSuccess?: (url: string) => unknown;
  onStateChange?: (snapshot: UploadTaskSnapshot) => unknown;
  onError?: (error: StorageError) => unknown;
};

type UploadFileOptions = UploadOptions & {
  file: File;
};

type UploadUintArrayOptions = UploadOptions & {
  uintArray: Uint8Array;
  fileName: string;
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

type FileValidationResult = {
  isValid: boolean;
  isImage: boolean;
  reason: FileInvalidReason | null;
};

type FileInvalidReason = 'invalid-file-format' | 'file-too-large';

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
