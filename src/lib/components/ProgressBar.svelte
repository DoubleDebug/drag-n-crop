<script>
  import { Progressbar } from 'flowbite-svelte';
  import { uploadPercentage } from '../../stores/state';
</script>

<Progressbar progress={$uploadPercentage} size="h-4" labelInside />
