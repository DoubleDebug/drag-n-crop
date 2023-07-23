<script lang="ts">
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import { Dropzone } from 'flowbite-svelte';
  import { setAllowedExtensions } from '../../../utils/upload';
  import { onMount } from 'svelte';
  import { reasonUploadFail, stage } from '../../../stores/state';

  export let file: File | null;
  let dropzone: HTMLDivElement;
  let isDragOver = false;
  $: dragoverClassname = isDragOver
    ? 'bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
    : '';
  onMount(() => setAllowedExtensions(dropzone));

  const extractFile = (event: any) => {
    const files = event.target?.files || event.dataTransfer?.files;
    if (!files || !files.length || files.length === 0) {
      stage.set('failed-to-upload');
      reasonUploadFail.set(`You didn't select any files.`);
      return;
    }
    file = files[0];
  };
</script>

<div bind:this={dropzone}>
  <Dropzone
    on:drop={(e) => e.preventDefault()}
    on:change={extractFile}
    on:drop={extractFile}
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
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 break-words">
        {#if file}
          {file.name}
        {:else}
          <span class="font-semibold">Click to upload</span> or drag and drop
        {/if}
      </p>
    </div>
  </Dropzone>
</div>
