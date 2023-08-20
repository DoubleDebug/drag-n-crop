<script lang="ts">
  import LoadingLabel from '../LoadingLabel.svelte';
  import InfoIcon from '$lib/icons/InfoIcon.svelte';
  import { Checkbox, Button, Spinner, Tooltip } from 'flowbite-svelte';
  import { stage, isImage, isResourceBad } from '../../../stores/state';
  import { ID_VIDEO_ELEMENT } from '../../../utils/constant';

  // props
  export let handleCrop: () => void;
  export let handleCancel: () => void;

  // handlers
  const toggleControls = () => {
    const videoElement = document.getElementById(
      ID_VIDEO_ELEMENT
    ) as HTMLVideoElement;
    if (!videoElement) return;
    showControls = !videoElement.controls;
    videoElement.controls = showControls;
  };

  // state
  let showControls = true;
  $: gapClass = !$isImage || $stage === 'cropping' ? 'gap-y-3' : '';
</script>

<div class={`grid ${gapClass} md:flex md:items-center md:justify-between`}>
  {#if $stage === 'cropping'}
    <span class="text-lg rev-order">
      <LoadingLabel
        text={`Your ${$isImage ? 'image' : 'video'} is being cropped`}
      />
    </span>
  {:else if $isResourceBad}
    <div class="flex items-center gap-2 text-red-400">
      There's an issue with the selected {$isImage ? 'image' : 'video'}.
      <span id="info-icon"><InfoIcon /></span>
      <Tooltip
        triggeredBy="[id='info-icon']"
        placement="bottom"
        class="text-sm p-1 max-w-sm"
      >
        This application does not have access to this image/video. Try
        downloading it to your device, and then uploading it here.
      </Tooltip>
    </div>
  {:else if !$isImage}
    <span class="rev-order">
      <Checkbox checked={showControls} on:change={toggleControls}>
        Show controls
      </Checkbox>
    </span>
  {:else}
    <span />
  {/if}
  <div class="btn-container">
    <Button
      disabled={$stage === 'cropping'}
      on:click={handleCancel}
      color="alternative"
    >
      Cancel
    </Button>
    <Button
      disabled={$stage === 'cropping' || $isResourceBad}
      on:click={handleCrop}
      class="max-h-[42px]"
    >
      {#if $stage === 'cropping'}
        <Spinner />
      {:else}
        Crop
      {/if}
    </Button>
  </div>
</div>

<style src="../../../styles/crop-actions.css"></style>
