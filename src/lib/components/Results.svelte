<script lang="ts">
  import { Button, Heading, Li, List, P } from 'flowbite-svelte';
  import {
    croppedFilePath,
    timeElapsed,
    croppedStoragePath,
    stage,
    isImage,
    rawStoragePath,
    originalFileSize,
    croppedFileSize,
    reasonDownloadFail,
  } from '../../stores/state';
  import { resetState } from '../../utils/reset';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';
  import { onMount } from 'svelte';
  import { handleDownload } from '../../utils/download';

  let mediaHeightClass = 'h-full';
  const ID_MEDIA_ELEMENT = 'media-element';

  onMount(() => {
    const mediaElement = document.getElementById(ID_MEDIA_ELEMENT);
    if (!mediaElement) return;

    let width, height;
    if ($isImage) {
      width = (mediaElement as HTMLImageElement).naturalWidth;
      height = (mediaElement as HTMLImageElement).naturalHeight;
    } else {
      width = (mediaElement as HTMLVideoElement).videoWidth;
      height = (mediaElement as HTMLVideoElement).videoHeight;
    }

    if (width > height) {
      mediaHeightClass = 'h-full';
    } else {
      mediaHeightClass = 'h-min self-center';
    }
  });

  const handleReset = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };

  $: time = (() => {
    if ($timeElapsed > 60) {
      const minutes = $timeElapsed % 60;
      return `${minutes} minutes, ${$timeElapsed} second${
        $timeElapsed === 1 ? '' : 's'
      }`;
    }

    return `${$timeElapsed} second${$timeElapsed === 1 ? '' : 's'}`;
  })();
</script>

<div class={`flex justify-center w-[800px] h-[600px] bshadow`}>
  <div class="flex relative">
    <div class="absolute inset-0 bg-black opacity-75" />
    <div
      class="absolute grid gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-left"
    >
      <div class="grid gap-2 text-white">
        <Heading tag="h3" class="text-white">Results</Heading>
        <List list="disc">
          <Li>
            Time elapsed:
            <span class="float-right">{time}</span></Li
          >
          <Li>
            Original file size:
            <span class="float-right"> {$originalFileSize} MB</span>
          </Li>
          <Li>
            Cropped file size:
            <span class="float-right"> {$croppedFileSize} MB</span>
          </Li>
        </List>
      </div>
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
