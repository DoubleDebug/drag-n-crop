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
    reasonCropFail,
  } from '../../stores/state';
  import { Button, P, Spinner } from 'flowbite-svelte';
  import { CropApi } from '$lib/api/crop';
  import type { CropOptions } from '../../app';
  import { FirebaseStorageApi } from '$lib/api/firebase-storage';

  const CONTAINER_HEIGHT = 600;
  const ID_CROP_AREA = 'crop-area';
  const ID_VIDEO = 'video-element';
  let timeoutId: any;
  let intervalId: any;

  onMount(() => {
    console.log('TODO: On light mode, header should be darker.');
    console.log('TODO: Show controls checkbox');

    timeoutId = setTimeout(() => {
      const cropper = Jcrop.attach(ID_CROP_AREA);
      const jcropStage = document.getElementsByClassName(
        'jcrop-stage'
      )[0] as HTMLElement;
      jcropStage.style.height = `${CONTAINER_HEIGHT}px`;
      jcropStage.style.position = 'absolute';
      cropper.addClass('jcrop-ux-no-outline');
      jcrop.set(cropper);

      let mediaElement;
      if ($isImage) {
        mediaElement = document.getElementById(ID_CROP_AREA);
      } else {
        mediaElement = document.getElementById(ID_VIDEO);
      }
      if (!mediaElement) return;

      const { width, height } = mediaElement.getBoundingClientRect();
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
    if (!$rawStoragePath) {
      console.log('TODO: No selected image.');
      return;
    }

    // start cropping
    stage.set('cropping');
    intervalId = setInterval(() => timeElapsed.update((num) => num + 1), 1);

    // calculate real coordinates
    let mediaElement, naturalWidth, naturalHeight;
    if ($isImage) {
      mediaElement = document.getElementById(ID_CROP_AREA) as HTMLImageElement;
      naturalWidth = mediaElement.naturalWidth;
      naturalHeight = mediaElement.naturalHeight;
    } else {
      mediaElement = document.getElementById(ID_VIDEO) as HTMLVideoElement;
      naturalWidth = mediaElement.videoWidth;
      naturalHeight = mediaElement.videoHeight;
    }

    const widthPercentage =
      mediaElement.getBoundingClientRect().width / naturalWidth;
    const heightPercentage =
      mediaElement.getBoundingClientRect().height / naturalHeight;
    let width = Math.round($jcrop.active.pos.w / widthPercentage);
    let height = Math.round($jcrop.active.pos.h / heightPercentage);
    const x = Math.round($jcrop.active.pos.x / widthPercentage);
    const y = Math.round($jcrop.active.pos.y / heightPercentage);

    if (width + x > naturalWidth) {
      width = naturalWidth - x;
    }
    if (height + y > naturalHeight) {
      height = naturalHeight - y;
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
      response = await CropApi.cropImage(data).catch((error) => {
        console.log(error);
        reasonCropFail.set(
          'There was an error while connecting to the server.'
        );
      });
    } else {
      response = await CropApi.cropVideo(data).catch(() => {
        reasonCropFail.set(
          'There was an error while connecting to the server.'
        );
      });
    }

    clearInterval(intervalId);
    if (response && response.success) {
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
  <div
    class={`flex justify-center w-[800px] h-[${CONTAINER_HEIGHT}px] bshadow`}
  >
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
            id={ID_VIDEO}
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
