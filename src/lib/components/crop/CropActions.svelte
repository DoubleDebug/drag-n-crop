<script lang="ts">
  import LoadingLabel from '../LoadingLabel.svelte';
  import { Checkbox, Button, Spinner } from 'flowbite-svelte';
  import { stage, isImage } from '../../../stores/state';
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
      disabled={$stage === 'cropping'}
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
