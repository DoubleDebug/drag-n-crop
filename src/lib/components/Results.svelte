<script>
  import { Button, P } from 'flowbite-svelte';
  import {
    croppedFilePath,
    timeElapsed,
    croppedStoragePath,
    stage,
    isImage,
    rawFileUrl,
    rawStoragePath,
    uploadPercentage,
    reasonInvalid,
    reasonUploadFail,
    jcrop,
  } from '../../stores/state';
  import { resetState } from '../../utils/reset';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';

  const handleDownload = async () => {
    if (!$croppedFilePath) {
      console.log('TODO: nothing to download');
      return;
    }

    const image = await fetch($croppedFilePath).then((file) => file.blob());
    const url = URL.createObjectURL(image);
    const link = document.createElement('a');
    link.href = url;

    console.log('TODO: refactor');
    const fileName = /(.+)\/(.+)\/(.+)/.exec($croppedStoragePath || '');
    link.download = fileName ? fileName[3] : `${crypto.randomUUID()}.jpg`;

    link.click();
    stage.set('downloaded');
  };

  const handleReset = () => {
    if ($rawStoragePath) {
      FirebaseStorageApi.deleteFile($rawStoragePath);
    }
    resetState();
  };
</script>

<div class={`flex justify-center w-[800px] h-[600px] bshadow`}>
  <div class="flex relative">
    <div class="absolute inset-0 bg-black opacity-70" />
    <div
      class="absolute grid gap-3 left-1/2 -translate-x-1/2 bottom-[20%] z-10"
    >
      <P size="2xl">Results:</P>
      <P size="lg">Time elapsed: {$timeElapsed}</P>
      <Button on:click={handleReset} color="alternative" class="min-w-[300px]"
        >Reset</Button
      >
      <Button on:click={handleDownload}>Download</Button>
    </div>
    {#if $isImage}
      <img
        src={$croppedFilePath}
        alt="Cropped resource"
        class="h-full aspect-auto"
      />
    {:else}
      <video src={$croppedFilePath} class="h-full aspect-auto" controls>
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
