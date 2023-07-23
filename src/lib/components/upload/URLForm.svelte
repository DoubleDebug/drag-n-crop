<script>
  import { Button, Helper, Input, Label } from 'flowbite-svelte';
  import { isImage, rawFileUrl } from '../../../stores/state';
  import { FileApi } from '../../../api/file';

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    rawFileUrl.set(clipboardText);
  };

  let isUrlValid = true;
  $: if ($rawFileUrl && $rawFileUrl !== '') {
    const url = $rawFileUrl;
    const fileName = FileApi.getFilenameFromStoragePath(url);
    const isValidImage = FileApi.isImageFormatSupported(fileName);
    const isValidVideo = FileApi.isVideoFormatSupported(fileName);
    if (isValidImage || isValidVideo) {
      isImage.set(isValidImage);
      isUrlValid = true;
    } else {
      isUrlValid = false;
    }
  }
</script>

<div
  class="grid text-left min-h-[320px] bg-gray-50 dark:bg-gray-700 rounded-lg place-items-center"
>
  <div class="grid w-5/6">
    <Label for="first_name" class="mb-2">
      <span class="flex mb-1 ml-2">URL:</span>
      <div class="grid md:flex gap-2">
        <Input
          type="text"
          placeholder="https://www.example.com/my-image.jpg"
          required
          bind:value={$rawFileUrl}
        />
        <Button color="alternative" on:click={handlePaste}>Paste</Button>
      </div>
      {#if !isUrlValid}
        <Helper class="ml-2 mt-1 md:mt-0 text-sm !text-red-400">
          URL does not contain a valid image or video.
        </Helper>
      {/if}
    </Label>
  </div>
</div>
