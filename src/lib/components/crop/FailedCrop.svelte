<script>
  import { Accordion, AccordionItem, Button, Card } from 'flowbite-svelte';
  import {
    isImage,
    rawFileUrl,
    reasonCropFail,
    stage,
  } from '../../../stores/state';
  import InfoIcon from '$lib/icons/InfoIcon.svelte';
</script>

<div class="grid gap-2 w-full">
  <Card class="flex max-w-none">
    <div class="grid gap-3">
      <Accordion class="crop-fail-accordion">
        <AccordionItem open>
          <span slot="header">
            <div class="flex items-center gap-2 text-red-400">
              <InfoIcon />
              Failed to crop the {$isImage ? 'image' : 'video'}.
            </div>
          </span>
          <p class="text-left">{$reasonCropFail}</p>
        </AccordionItem>
      </Accordion>
      <Button
        class="ml-auto w-full lg:w-40"
        on:click={() => {
          stage.set('ready-to-upload');
          rawFileUrl.set(null);
        }}
      >
        Try again
      </Button>
    </div>
  </Card>
</div>
