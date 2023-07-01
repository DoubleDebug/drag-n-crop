<script lang="ts">
  import CropArea from '$lib/components/CropArea.svelte';
  import Dropzone from '$lib/components/Dropzone.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Results from '$lib/components/Results.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { stage, uploadPercentage } from '../../stores/state';
</script>

<div class="flex justify-center mt-16 p-8">
  <div class="grid gap-20 text-center w-full max-w-[1024px]">
    <Heading />
    <div class="grid md:flex items-center gap-10">
      <Stepper />
      {#if $stage === 'ready-to-upload'}
        <Dropzone />
      {/if}
      {#if $stage === 'uploading' || $stage === 'failed-to-upload'}
        <ProgressBar percentage={$uploadPercentage} />
      {/if}
      {#if $stage === 'ready-to-crop' || $stage === 'cropping' || $stage === 'failed-to-crop'}
        <CropArea />
      {/if}
      {#if $stage === 'ready-to-download' || $stage === 'downloaded'}
        <Results />
      {/if}
    </div>
  </div>
</div>
