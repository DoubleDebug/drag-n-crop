<script lang="ts">
  import URLForm from './URLForm.svelte';
  import FileDropzone from './FileDropzone.svelte';
  import UploadTypeSwitch from './UploadTypeSwitch.svelte';
  import { rawFileUrl, uploadType } from '../../../stores/state';
  import { Button } from 'flowbite-svelte';
  import { handleUploadFile, handleUploadFromUrl } from '../../../utils/upload';
  import { UrlHelper } from '../../../api/url';

  let file: File | null = null;

  const handleUpload = () => {
    if ($uploadType === 'file') {
      handleUploadFile(file);
    } else {
      handleUploadFromUrl($rawFileUrl);
    }
  };

  $: isUploadDisabled = (() => {
    if ($uploadType === 'file') {
      return !file;
    } else {
      if (!$rawFileUrl) return true;

      const isValidImage = UrlHelper.isImageUrl($rawFileUrl);
      const isValidVideo = UrlHelper.isVideoUrl($rawFileUrl);
      return !isValidImage && !isValidVideo;
    }
  })();
</script>

<div class="grid gap-3 w-full">
  <UploadTypeSwitch />
  {#if $uploadType === 'file'}
    <FileDropzone bind:file />
  {:else if $uploadType === 'url'}
    <URLForm />
  {/if}
  <Button
    color="primary"
    class="w-full md:w-[200px] md:ml-auto"
    disabled={isUploadDisabled}
    on:click={handleUpload}
  >
    Upload
  </Button>
</div>
