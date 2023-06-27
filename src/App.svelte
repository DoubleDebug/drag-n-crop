<script lang="ts">
  import CropArea from '$lib/components/CropArea.svelte';
  import Dropzone from '$lib/components/Dropzone.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import { steps } from '$lib/components/steps';
  import { stage, stepNumber } from './stores/state';
  import { Steps } from 'svelte-steps';
</script>

<div class="flex justify-center mt-24 h-[80vh]">
  <div class="grid text-center h-min w-[800px]">
    <Heading />
    <p>Stage is: {$stage}</p>
    <div class="flex">
      <Steps vertical {steps} current={$stepNumber} primary="var(--orange)" />
      {#if $stage === 'ready-to-upload'}
        <Dropzone />
      {/if}
      {#if $stage === 'uploading'}
        <ProgressBar />
      {/if}
      {#if $stage === 'ready-to-crop'}
        <CropArea />
      {/if}
    </div>
  </div>
</div>
