<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import {
    croppedFilePath,
    croppedStoragePath,
    rawStoragePath,
  } from '../../../stores/state';
  import { handleDownload as downloadResult } from '../../../utils/download';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';
  import { resetState } from '../../../utils/reset';
  import LoadingIcon from '$lib/icons/LoadingIcon.svelte';

  let stage: 'default' | 'downloading' | 'cooldown' = 'default';

  const handleReset = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };

  const handleDownload = async () => {
    stage = 'downloading';
    await downloadResult($croppedFilePath, $croppedStoragePath);
    stage = 'cooldown';
    setTimeout(() => {
      stage = 'default';
    }, 3000);
  };
</script>

<div class="grid gap-2">
  <Button on:click={handleReset} color="alternative" class="min-w-[300px]">
    Reset
  </Button>
  <Button
    on:click={handleDownload}
    className="max-h-[42px]"
    disabled={stage === 'cooldown'}
  >
    {#if stage === 'default'}
      Download
    {:else if stage === 'downloading'}
      <LoadingIcon />
    {:else}
      Downloaded ✓
    {/if}
  </Button>
</div>
