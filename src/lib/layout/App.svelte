<script lang="ts">
  import CropStage from '$lib/components/crop/CropStage.svelte';
  import UploadStage from '$lib/components/upload/UploadStage.svelte';
  import FailedCrop from '$lib/components/crop/FailedCrop.svelte';
  import FailedDownload from '$lib/components/download/FailedDownload.svelte';
  import FailedUpload from '$lib/components/upload/FailedToUpload.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import UploadingProgress from '$lib/components/upload/UploadingProgress.svelte';
  import DownloadStage from '$lib/components/download/DownloadStage.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { stage } from '../../stores/state';
</script>

<div class="flex justify-center mt-4 lg:mt-16 p-8">
  <div class="grid gap-20 text-center w-full max-w-[1024px]">
    <Heading />
    <div class="grid md:flex justify-center items-center gap-4 lg:gap-10">
      <Stepper />
      {#if $stage === 'ready-to-upload'}
        <UploadStage />
      {/if}
      {#if $stage === 'failed-to-upload'}
        <FailedUpload />
      {/if}
      {#if $stage === 'uploading'}
        <UploadingProgress />
      {/if}
      {#if $stage === 'ready-to-crop' || $stage === 'cropping'}
        <CropStage />
      {/if}
      {#if $stage === 'failed-to-crop'}
        <FailedCrop />
      {/if}
      {#if $stage === 'ready-to-download' || $stage === 'downloaded'}
        <DownloadStage />
      {/if}
      {#if $stage === 'failed-to-download'}
        <FailedDownload />
      {/if}
    </div>
  </div>
</div>
