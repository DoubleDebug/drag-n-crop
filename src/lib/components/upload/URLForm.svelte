<script>
  import { Button, Helper, Input, Label } from 'flowbite-svelte';
  import { rawFileUrl } from '../../../stores/state';
  import { UrlHelper } from '../../../api/url';

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    rawFileUrl.set(clipboardText);
  };

  $: isUrlInvalid = (() => {
    if (!$rawFileUrl) return false;

    const isValidImage = UrlHelper.isImageUrl($rawFileUrl);
    const isValidVideo = UrlHelper.isVideoUrl($rawFileUrl);
    return !isValidImage && !isValidVideo;
  })();
</script>

<div
  class="grid text-left min-h-[320px] bg-gray-50 dark:bg-gray-700 rounded-lg place-items-center"
>
  <div class="grid w-5/6">
    <Label for="first_name" class="mb-2">
      <span class="flex mb-1 ml-2">URL:</span>
      <div class="grid md:flex gap-2">
        <Input
          id="input-url"
          type="text"
          placeholder="https://www.example.com/my-image.jpg"
          required
          bind:value={$rawFileUrl}
        />
        <Button color="alternative" on:click={handlePaste}>Paste</Button>
      </div>
      {#if isUrlInvalid}
        <Helper class="ml-2 mt-1 md:mt-0 text-sm !text-red-400">
          URL does not contain a valid image or video.
        </Helper>
      {/if}
    </Label>
  </div>
</div>
