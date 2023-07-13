<script lang="ts">
  import { Accordion, AccordionItem, Button, Card } from 'flowbite-svelte';
  import {
    croppedFilePath,
    croppedStoragePath,
    isImage,
    reasonDownloadFail,
  } from '../../../stores/state';
  import InfoIcon from '$lib/icons/InfoIcon.svelte';
  import { resetState } from '../../../utils/reset';
  import { handleDownload } from '../../../utils/download';
  import { onDestroy } from 'svelte';
  import LoadingIcon from '$lib/icons/LoadingIcon.svelte';

  let timeoutId: NodeJS.Timeout;
  let stage: 'default' | 'downloading' | 'cooldown' = 'default';

  const handleTryAgain = async () => {
    stage = 'downloading';
    await handleDownload($croppedFilePath, $croppedStoragePath);
    stage = 'cooldown';
    timeoutId = setTimeout(() => {
      stage = 'default';
    }, 3000);
  };

  onDestroy(() => {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
  });
</script>

<div class="grid gap-2 w-full">
  <Card class="flex max-w-none">
    <div class="grid gap-3">
      <Accordion class="crop-fail-accordion">
        <AccordionItem open>
          <span slot="header">
            <div class="flex items-center gap-2 text-red-400">
              <InfoIcon />
              Failed to download the {$isImage ? 'image' : 'video'}.
            </div>
          </span>
          <p class="text-left">{$reasonDownloadFail}</p>
        </AccordionItem>
      </Accordion>
      <div class="flex gap-2">
        <Button
          class="lg:w-40 max-h-[42px]"
          on:click={handleTryAgain}
          disabled={stage !== 'default'}
        >
          {#if stage === 'default'}
            Try again
          {:else if stage === 'downloading'}
            <LoadingIcon />
          {:else}
            Failed ✖
          {/if}
        </Button>
        <Button
          color="alternative"
          class="lg:w-40 max-h-[42px]"
          on:click={resetState}
        >
          Reset
        </Button>
      </div>
    </div>
  </Card>
</div>
