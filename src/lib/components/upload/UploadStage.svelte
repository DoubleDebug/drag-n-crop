<script lang="ts">
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import { Dropzone } from 'flowbite-svelte';
  import { handleNewFile, setAllowedExtensions } from '../../../utils/upload';
  import { onMount } from 'svelte';

  let isDragOver = false;
  let dropzone: HTMLDivElement;
  onMount(() => setAllowedExtensions(dropzone));

  $: dragoverClassname = isDragOver
    ? 'bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
    : '';
</script>

<div bind:this={dropzone} class="w-full">
  <Dropzone
    on:drop={(e) => e.preventDefault()}
    on:change={handleNewFile}
    on:drop={handleNewFile}
    on:dragover={(e) => {
      e.preventDefault();
      isDragOver = true;
    }}
    on:dragleave={(e) => {
      e.preventDefault();
      isDragOver = false;
    }}
    class={`dropzone ${dragoverClassname}`}
  >
    <div class="flex justify-center align-center flex-col h-full">
      <div class="text-5xl mb-5">
        <UploadIcon />
      </div>
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span class="font-semibold">Click to upload</span> or drag and drop
      </p>
    </div>
  </Dropzone>
</div>
