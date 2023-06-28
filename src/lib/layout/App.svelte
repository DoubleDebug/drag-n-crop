<script lang="ts">
  import CropArea from '$lib/components/CropArea.svelte';
  import Dropzone from '$lib/components/Dropzone.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { stage, uploadPercentage } from '../../stores/state';
</script>

<div class="flex justify-center mt-24">
  <div class="grid gap-20 text-center h-min w-[1000px]">
    <Heading />
    <div class="flex items-center gap-10">
      <Stepper />
      {#if $stage === 'ready-to-upload'}
        <Dropzone />
      {/if}
      {#if $stage === 'uploading'}
        <ProgressBar percentage={$uploadPercentage} />
      {/if}
      {#if $stage === 'ready-to-crop'}
        <CropArea />
      {/if}
    </div>
  </div>
</div>
