<script lang="ts">
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';
  import { Dropzone } from 'flowbite-svelte';
  import {
    rawFileUrl,
    stage,
    rawStoragePath,
    uploadPercentage,
  } from '../../stores/state';

  let isDragOver = false;
  $: className = isDragOver
    ? 'bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
    : '';

  const handleNewFile = (event: any) => {
    event.preventDefault();
    stage.set('uploading');

    const files = event.target?.files || event.dataTransfer?.files;
    if (!files || !files.length || files.length === 0) {
      console.log('TODO: no files selected');
      stage.set('failed-to-upload');
      return;
    }
    const firstFile = files[0];

    const path = FirebaseStorageApi.uploadFile({
      file: firstFile,
      isImage: true,
      onStateChange: (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progressFormatted = Math.round(progress).toString();
        uploadPercentage.set(progressFormatted);
      },
      onSuccess: (url) => {
        rawFileUrl.set(url);
        stage.set('ready-to-crop');
      },
      onError: () => {
        stage.set('failed-to-upload');
      },
    });
    rawStoragePath.set(path);
  };
</script>

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
  class={`h-full ${className}`}
>
  <div class="grid text-center">
    <div class="text-5xl mb-5">
      <UploadIcon />
    </div>
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <!-- <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
      Supported image formats: jpg, jpeg, png, gif, bmp, webp, svg (MAX 1GB).
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">
      Supported video formats: mp4, mkv, flv, avi, mov, wmv, webm (MAX 100MB).
    </p> -->
  </div>
</Dropzone>
