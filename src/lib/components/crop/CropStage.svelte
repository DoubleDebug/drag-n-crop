<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { isImage, jcrop, rawStoragePath } from '../../../stores/state';
  import { FirebaseStorageApi } from '../../../api/firebase-storage';
  import { resetState } from '../../../utils/reset';
  import { JcropUtils } from '../../../utils/jcrop';
  import { CropUtils } from '../../../utils/crop';
  import CropElement from './CropSelection.svelte';
  import CropActions from './CropActions.svelte';

  // state
  let timeoutId: any;

  // lifecycle
  onMount(() => {
    setInterval(() => JcropUtils.validateJcropPlacement($jcrop), 5000);
    timeoutId = setTimeout(() => JcropUtils.attachJcrop($isImage), 500);
  });
  onDestroy(() => {
    clearTimeout(timeoutId);
  });

  // handlers
  const handleCrop = () =>
    CropUtils.handleCrop($jcrop, $rawStoragePath, $isImage);
  const handleCancel = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };
</script>

<div class="grid gap-3">
  <CropElement />
  <CropActions {handleCrop} {handleCancel} />
</div>
