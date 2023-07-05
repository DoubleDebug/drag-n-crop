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
    stage.set('ready-to-upload');
    isImage.set(true);
    rawFileUrl.set(null);
    croppedFilePath.set(null);
    rawStoragePath.set(null);
    croppedStoragePath.set(null);
    uploadPercentage.set('0');
    reasonInvalid.set(null);
    reasonUploadFail.set(null);
    jcrop.set(null);
    timeElapsed.set(0);
  };
</script>

<div class="grid grid-cols-2 gap-5">
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
  <div class="grid gap-5">
    <P size="2xl">Results:</P>
    <P size="lg">Time elapsed: {$timeElapsed}</P>
    <Button on:click={handleDownload}>Download</Button>
    <Button on:click={handleReset} color="alternative">Reset</Button>
  </div>
</div>
