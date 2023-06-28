<script lang="ts">
  import { onMount } from 'svelte';
  import {
    fileUrl,
    isImage,
    jcrop,
    stage,
    storagePath,
  } from '../../stores/state';
  import { Button, P, Spinner } from 'flowbite-svelte';
  import { CropApi } from '$lib/api/crop';
  import type { CropOptions } from '../../app';

  const ID_CROP_IMAGE = 'crop-image';

  onMount(() => {
    setTimeout(() => {
      const cropper = Jcrop.attach(ID_CROP_IMAGE);
      jcrop.set(cropper);

      const imageElement = document.getElementById(ID_CROP_IMAGE);
      if (!imageElement) return;

      const { width, height } = imageElement.getBoundingClientRect();
      const w = width * 0.8;
      const h = height * 0.4;
      const x = width * 0.1;
      const y = width * 0.1;

      cropper.newWidget(Jcrop.Rect.create(x, y, w, h));
    }, 500);
  });

  const handleCrop = async () => {
    if (!$storagePath) {
      console.log('No selected image.');
      return;
    }

    stage.set('cropping');

    const data: CropOptions = {
      storage_file_path: $storagePath,
      dimensions: {
        top_left_point: {
          x: $jcrop.active.pos.x,
          y: $jcrop.active.pos.y,
        },
        size: {
          width: $jcrop.active.pos.w,
          height: $jcrop.active.pos.h,
        },
      },
    };

    let response;
    if ($isImage) {
      response = await CropApi.cropImage(data);
    } else {
      response = await CropApi.cropVideo(data);
    }

    if (response.success) {
      stage.set('success');
      console.log('successful crop', response);
    } else {
      stage.set('failed-to-crop');
      console.log('failed to crop', response);
    }
  };
</script>

<div class="grid gap-5">
  <div class="flex justify-center w-[800px] h-[600px] bshadow">
    {#if fileUrl}
      <img
        id={ID_CROP_IMAGE}
        src={$fileUrl}
        alt="Cropping resource"
        class="h-full aspect-auto"
      />
    {/if}
  </div>
  <div class="flex items-center justify-between">
    <P size="lg">
      {#if $stage === 'cropping'}
        Your {$isImage ? 'image' : 'video'} is being cropped...
      {/if}
    </P>
    <div class="btn-container">
      <Button disabled={$stage === 'cropping'} color="alternative"
        >Cancel</Button
      >
      <Button disabled={$stage === 'cropping'} on:click={handleCrop}>
        {#if $stage === 'cropping'}
          <Spinner />
        {:else}
          Crop
        {/if}
      </Button>
    </div>
  </div>
</div>

<style>
  .bshadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

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
</style>
