<script lang="ts">
  import 'cropperjs/dist/cropper.css';
  import { onMount } from 'svelte';
  import { CropperUtils } from '../../../utils/cropper';
  import { rawFileUrl, isImage, cropper } from '../../../stores/state';
  import { ID_CROP_AREA, ID_VIDEO_ELEMENT } from '../../../utils/constant';

  let heightClass = 'h-full';
  const updateHeightClass = () => {
    if (!$cropper) return;
    const { naturalHeight, naturalWidth } = $cropper.getImageData();
    if (naturalWidth > naturalHeight) heightClass = '';
  };

  onMount(() => {
    const videoEl = document.getElementById(ID_VIDEO_ELEMENT);
    const imageEl = document.getElementById(ID_CROP_AREA);
    videoEl?.addEventListener('loadeddata', CropperUtils.initCropper);
    imageEl?.addEventListener('load', CropperUtils.initCropper);
  });
</script>

<div class="flex justify-center max-w-full bshadow">
  {#if $rawFileUrl}
    {#if $isImage}
      <div class="block max-w-full">
        <img
          id={ID_CROP_AREA}
          src={$rawFileUrl}
          alt="Cropping resource"
          class="block max-w-full max-h-[100vh]"
          crossorigin="anonymous"
          on:load={updateHeightClass}
        />
      </div>
    {:else}
      <div class="relative">
        <canvas
          id={ID_CROP_AREA}
          class="absolute inset-0 w-full h-full block max-w-full max-h-[100vh]"
        />
        <video
          id={ID_VIDEO_ELEMENT}
          src={$rawFileUrl}
          class={`${heightClass} max-h-[100vh] aspect-auto`}
          crossorigin="anonymous"
          controls
          on:load={updateHeightClass}
        >
          <track kind="captions" />
        </video>
      </div>
    {/if}
  {/if}
</div>

<style>
  .bshadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
</style>
