<script>
  import { rawFileUrl, isImage } from '../../../stores/state';
  import {
    CONTAINER_HEIGHT,
    ID_CROP_AREA,
    ID_VIDEO_ELEMENT,
  } from '../../../utils/constant';
</script>

<div class={`flex justify-center w-[800px] h-[${CONTAINER_HEIGHT}px] bshadow`}>
  {#if $rawFileUrl}
    {#if $isImage}
      <img
        id={ID_CROP_AREA}
        src={$rawFileUrl}
        alt="Cropping resource"
        class="h-full aspect-auto"
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
          class="h-full aspect-auto"
          controls
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
