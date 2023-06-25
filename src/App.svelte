<script lang="ts">
  import Dropzone from '$lib/components/Dropzone.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import { steps } from '$lib/components/steps';
  import { stage } from './stores/global';
  import { Steps } from 'svelte-steps';
</script>

<div class="flex justify-center mt-24 h-[80vh]">
  <div class="grid text-center h-min w-[800px]">
    <Heading />
    <p>Stage is: {$stage}</p>
    <div class="flex">
      <Steps vertical {steps} primary="var(--orange)" />
      <Dropzone />
    </div>
  </div>
</div>
