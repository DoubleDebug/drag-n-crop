<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import {
    rawFileUrl,
    isImage,
    jcrop,
    stage,
    rawStoragePath,
    timeElapsed,
    croppedFilePath,
    croppedStoragePath,
  } from '../../stores/state';
  import { Button, P, Spinner } from 'flowbite-svelte';
  import { CropApi } from '$lib/api/crop';
  import type { CropOptions } from '../../app';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';

  const ID_CROP_IMAGE = 'crop-image';
  let timeoutId: any;
  let intervalId: any;

  onMount(() => {
    timeoutId = setTimeout(() => {
      const cropper = Jcrop.attach(ID_CROP_IMAGE);
      cropper.addClass('jcrop-ux-no-outline');
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
  onDestroy(() => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  });

  const handleCrop = async () => {
    console.log('TODO: Case when selecting an area that includes the border.');

    if (!$rawStoragePath) {
      console.log('TODO: No selected image.');
      return;
    }

    // start cropping
    stage.set('cropping');
    intervalId = setInterval(() => timeElapsed.update((num) => num + 1), 1);

    // calculate real coordinates
    const imageElement = document.getElementById(
      ID_CROP_IMAGE
    ) as HTMLImageElement;
    const widthPercentage =
      imageElement.getBoundingClientRect().width / imageElement.naturalWidth;
    const heightPercentage =
      imageElement.getBoundingClientRect().height / imageElement.naturalHeight;
    let width = Math.round($jcrop.active.pos.w / widthPercentage);
    let height = Math.round($jcrop.active.pos.h / heightPercentage);
    const x = Math.round($jcrop.active.pos.x / widthPercentage);
    const y = Math.round($jcrop.active.pos.y / heightPercentage);

    if (width + x > imageElement.naturalWidth) {
      width = imageElement.naturalWidth - x;
    }
    if (height + y > imageElement.naturalHeight) {
      height = imageElement.naturalHeight - y;
    }

    // prepare data
    const data: CropOptions = {
      storage_file_path: $rawStoragePath,
      dimensions: {
        top_left_point: { x, y },
        size: { width, height },
      },
    };

    let response;
    if ($isImage) {
      response = await CropApi.cropImage(data);
    } else {
      response = await CropApi.cropVideo(data);
    }

    clearInterval(intervalId);
    if (response.success) {
      stage.set('ready-to-download');
      croppedStoragePath.set(response.data);
      FirebaseStorageApi.downloadFile(response.data).then((url) => {
        croppedFilePath.set(url);
      });
    } else {
      stage.set('failed-to-crop');
      console.log('TODO: failed to crop', response);
    }
  };
</script>

<div class="grid gap-5">
  <div class="flex justify-center w-[800px] h-[600px] bshadow">
    {#if rawFileUrl}
      <img
        id={ID_CROP_IMAGE}
        src={$rawFileUrl}
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
      <Button disabled={$stage === 'cropping'} color="alternative">
        Cancel
      </Button>
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
