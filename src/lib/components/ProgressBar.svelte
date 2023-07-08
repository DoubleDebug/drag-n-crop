<script>
  import { Progressbar } from 'flowbite-svelte';

  export let percentage = '0';
</script>

<div class="w-full h-full grid place-items-center bar">
  <Progressbar progress={percentage} size="h-4" labelInside />
</div>

<style>
  .bar :global(.text-primary-100) {
    transition: width 1s ease;
  }
</style>
