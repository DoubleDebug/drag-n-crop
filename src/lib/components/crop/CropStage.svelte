<script lang="ts">
  import { onDestroy } from 'svelte';
  import {
    isImage,
    cropper,
    rawFileUrl,
    rawStoragePath,
    uploadType,
  } from '../../../stores/state';
  import { FirebaseStorageApi } from '../../../api/firebase-storage';
  import { resetState } from '../../../utils/reset';
  import { CropUtils } from '../../../utils/crop';
  import CropSelection from './CropSelection.svelte';
  import CropActions from './CropActions.svelte';

  let timeoutId: any;

  onDestroy(() => {
    clearTimeout(timeoutId);
  });

  // handlers
  const handleCrop = () => {
    let options = {
      cropper: $cropper,
      isImage: $isImage,
      uploadType: $uploadType,
      storagePath: $rawStoragePath || '',
      url: $rawFileUrl || '',
    };
    CropUtils.handleCrop(options);
  };
  const handleCancel = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };
</script>

<div class="grid gap-3 mdl:w-[600px] lg:w-[800px]">
  <CropSelection />
  <CropActions {handleCrop} {handleCancel} />
</div>
