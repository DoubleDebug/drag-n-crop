<script>
  import { Progressbar } from 'flowbite-svelte';

  export let percentage = '0';
</script>

<div class="w-full h-full grid place-items-center">
  <Progressbar progress={percentage} size="h-4" labelInside />
</div>
