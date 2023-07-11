<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import {
    croppedFilePath,
    croppedStoragePath,
    isImage,
    rawStoragePath,
  } from '../../../stores/state';
  import { resetState } from '../../../utils/reset';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';
  import { onMount } from 'svelte';
  import { handleDownload } from '../../../utils/download';
  import { ID_MEDIA_ELEMENT } from '../../../utils/constant';
  import { getMediaElementClassName } from '../../../utils/classname';
  import DownloadStats from './DownloadStats.svelte';

  let mediaHeightClass: string;

  onMount(() => {
    mediaHeightClass = getMediaElementClassName($isImage);
  });

  const handleReset = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };
</script>

<div class={`flex justify-center w-[800px] h-[600px] bshadow`}>
  <div class="flex relative">
    <div class="absolute inset-0 bg-black opacity-75" />
    <div
      class="absolute grid gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-left"
    >
      <DownloadStats />
      <div class="grid gap-2">
        <Button
          on:click={handleReset}
          color="alternative"
          class="min-w-[300px]"
        >
          Reset
        </Button>
        <Button
          on:click={() => handleDownload($croppedFilePath, $croppedStoragePath)}
        >
          Download
        </Button>
      </div>
    </div>
    {#if $isImage}
      <img
        id={ID_MEDIA_ELEMENT}
        src={$croppedFilePath}
        alt="Cropped resource"
        class={`${mediaHeightClass} max-h-full aspect-auto`}
      />
    {:else}
      <video
        id={ID_MEDIA_ELEMENT}
        src={$croppedFilePath}
        class={`${mediaHeightClass} max-h-full aspect-auto`}
      >
        <track kind="captions" />
      </video>
    {/if}
  </div>
</div>

<style>
  .bshadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
</style>
