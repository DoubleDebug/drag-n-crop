type AppStage =
  | 'ready-to-upload'
  | 'uploading'
  | 'failed-to-upload'
  | 'ready-to-crop'
  | 'cropping'
  | 'failed-to-crop'
  | 'success';
