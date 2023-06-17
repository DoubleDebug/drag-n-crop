<script lang="ts">
  import Dropzone from '$lib/components/Dropzone.svelte';
  import { stage } from './stores/global';
</script>

<div class="flex justify-center items-center h-[90vh]">
  <div class="grid text-center h-min w-[800px]">
    <h1>Drag-n-Crop!</h1>
    <p>Stage is: {$stage}</p>
    <Dropzone />
  </div>
</div>
