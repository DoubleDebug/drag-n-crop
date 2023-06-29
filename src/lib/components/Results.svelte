<script>
  import { Button, P } from 'flowbite-svelte';
  import {
    croppedFilePath,
    timeElapsed,
    croppedStoragePath,
    stage,
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
</script>

<div class="grid layout">
  <img
    src={$croppedFilePath}
    alt="Cropped resource"
    class="h-full aspect-auto"
  />
  <div class="grid gap-5">
    <P size="2xl">Results:</P>
    <P size="lg">Time elapsed: {$timeElapsed}</P>
    <Button on:click={handleDownload}>Download</Button>
  </div>
</div>

<style>
  .layout {
    grid-template-columns: 50% 50%;
  }
</style>
