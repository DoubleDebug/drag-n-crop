<script lang="ts">
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import { Dropzone } from 'flowbite-svelte';

  let isDragOver = false;

  const handleDropFile = (event: any) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      alert('You dropped ' + fileName);
    }
  };
</script>

<Dropzone
  on:drop={(e) => e.preventDefault()}
  on:drop={handleDropFile}
  on:dragover={(e) => {
    e.preventDefault();
    isDragOver = true;
  }}
  on:dragleave={(e) => {
    e.preventDefault();
    isDragOver = false;
  }}
  class={isDragOver ? 'bg-gray-100 dark:border-gray-500 dark:bg-gray-600' : ''}
>
  <div class="grid text-center">
    <div class="text-5xl">
      <UploadIcon />
    </div>
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
      Supported image formats: jpg, jpeg, png, gif, bmp, webp, svg (MAX 1GB).
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">
      Supported video formats: mp4, mkv, flv, avi, mov, wmv, webm (MAX 100MB).
    </p>
  </div>
</Dropzone>
