<script lang="ts">
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import { Dropzone } from 'flowbite-svelte';
  import { handleNewFile } from '../../../utils/upload';
  import { isImage } from '../../../stores/state';

  let isDragOver = false;
  $: dragoverClassname = isDragOver
    ? 'bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
    : '';
</script>

<Dropzone
  on:drop={(e) => e.preventDefault()}
  on:change={(e) => handleNewFile(e, $isImage)}
  on:drop={(e) => handleNewFile(e, $isImage)}
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

<style>
  :global(.dropzone) {
    height: 100% !important;
    min-height: 320px;
  }

  @media only screen and (max-width: 768px) {
    :global(.dropzone) {
      justify-self: center;
    }
  }

  :global(.dropzone) > :global(label) {
    width: 100%;
    height: 100%;
  }
</style>
