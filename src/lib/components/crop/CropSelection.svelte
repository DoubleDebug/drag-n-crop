<script lang="ts">
  import { rawFileUrl, isImage } from '../../../stores/state';
  import {
    CONTAINER_HEIGHT,
    ID_CROP_AREA,
    ID_VIDEO_ELEMENT,
  } from '../../../utils/constant';
  import { CropUtils } from '../../../utils/crop';

  let heightClass = 'h-full';
  const updateHeightClass = () => {
    const { naturalHeight, naturalWidth } = CropUtils.getMediaElement($isImage);
    if (naturalWidth > naturalHeight) heightClass = '';
  };
</script>

<div
  class={`flex justify-center w-full md:w-[800px] h-[${CONTAINER_HEIGHT}px] bshadow`}
>
  {#if $rawFileUrl}
    {#if $isImage}
      <img
        id={ID_CROP_AREA}
        src={$rawFileUrl}
        alt="Cropping resource"
        class={`${heightClass} aspect-auto`}
        on:load={updateHeightClass}
      />
    {:else}
      <div class="relative">
        <img
          id={ID_CROP_AREA}
          src={'transparent.png'}
          alt="Cropping resource"
          class="absolute top-0 left-0 w-full h-full"
        />
        <video
          id={ID_VIDEO_ELEMENT}
          src={$rawFileUrl}
          class={`${heightClass} aspect-auto`}
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
