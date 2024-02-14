import type Cropper from 'cropperjs';
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

type FirebaseUploadOptions = {
  isImage: boolean;
  onSuccess?: (url: string) => unknown;
  onStateChange?: (snapshot: UploadTaskSnapshot) => unknown;
  onError?: (error: StorageError) => unknown;
};

type FirebaseUploadFileOptions = FirebaseUploadOptions & {
  file: File;
};

type FirebaseUploadUintArrayOptions = FirebaseUploadOptions & {
  uintArray: Uint8Array;
  fileName: string;
};

type UploadMediaRequest = {
  url: string;
};

type CropOptions =
  | {
      storage_file_path: string;
      dimensions: CropDimensions;
    }
  | {
      url: string;
      dimensions: CropDimensions;
    };

type CropDimensions = {
  top_left_point: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
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

type BaseCropOptions = {
  cropper: Cropper | null;
  isImage: boolean;
};

type HandleCropOptions = BaseCropOptions &
  (
    | {
        uploadType: 'file';
        storagePath: string;
      }
    | {
        uploadType: 'url';
        url: string;
      }
  );

type FileInvalidReason = 'invalid-file-format' | 'file-too-large';
