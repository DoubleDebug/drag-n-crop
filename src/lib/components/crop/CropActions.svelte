<script lang="ts">
  import LoadingLabel from '../LoadingLabel.svelte';
  import { P, Checkbox, Button, Spinner } from 'flowbite-svelte';
  import { stage, isImage } from '../../../stores/state';
  import { ID_VIDEO_ELEMENT } from '../../../utils/constant';

  // state
  let showControls = true;

  // handlers
  const toggleControls = () => {
    const videoElement = document.getElementById(
      ID_VIDEO_ELEMENT
    ) as HTMLVideoElement;
    if (!videoElement) return;
    showControls = !videoElement.controls;
    videoElement.controls = showControls;
  };

  // props
  export let handleCrop: () => void;
  export let handleCancel: () => void;

  $: gapClass = !$isImage || $stage === 'cropping' ? 'gap-y-3' : '';
</script>

<div class={`grid ${gapClass} md:flex md:items-center md:justify-between`}>
  <P size="lg">
    {#if $stage === 'cropping'}
      <LoadingLabel
        text={`Your ${$isImage ? 'image' : 'video'} is being cropped`}
      />
    {:else if !$isImage}
      <Checkbox checked={showControls} on:change={toggleControls}>
        Show controls
      </Checkbox>
    {/if}
  </P>
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

<style>
  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }

  .btn-container :global(:last-child) {
    width: 200px;
  }

  .btn-container :global(:first-child) {
    width: 150px;
  }

  @media only screen and (max-width: 768px) {
    .btn-container {
      display: grid;
      width: 100%;
      justify-content: normal;
      gap: 10px;
    }

    .btn-container :global(:last-child) {
      width: 100%;
    }

    .btn-container :global(:first-child) {
      width: 100%;
    }
  }
</style>
