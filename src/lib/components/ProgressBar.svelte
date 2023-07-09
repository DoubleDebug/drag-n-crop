<script>
  import { Heading, Progressbar } from 'flowbite-svelte';
  import LoadingLabel from './LoadingLabel.svelte';

  export let percentage = '0';
</script>

<div class="grid w-full gap-2">
  <Heading class="text-left" customSize="text-2xl">
    <LoadingLabel text="Uploading your file" />
  </Heading>
  <div class="place-items-center bar">
    <Progressbar progress={percentage} size="h-4" labelInside />
  </div>
</div>

<style>
  .bar :global(.text-primary-100) {
    transition: width 1s ease;
  }
</style>
