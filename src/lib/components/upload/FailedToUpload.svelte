<script>
  import {
    Accordion,
    AccordionItem,
    Badge,
    Button,
    Card,
    Li,
    List,
  } from 'flowbite-svelte';
  import {
    reasonInvalid,
    reasonUploadFail,
    stage,
  } from '../../../stores/state';
  import { FileApi } from '$lib/api/file';
  import InfoIcon from '$lib/icons/InfoIcon.svelte';

  let imageExtensions = FileApi.validImageFormats;
  let videoExtensions = FileApi.validVideoFormats;
  $: invalidMessage = (() => {
    switch ($reasonInvalid) {
      case 'invalid-file-format':
        return `The format of the selected file isn't supported.`;
      case 'file-too-large':
        return `The selected file was too large. The size limit is ${
          FileApi.imageSizeLimit / 1024 / 1024
        } MB for images and ${
          FileApi.videoSizeLimit / 1024 / 1024
        } for videos.`;
      default:
        return `There was an error while uploading your file. Please try again.`;
    }
  })();
</script>

<div class="grid gap-2 w-full">
  <Card class="flex max-w-none">
    <div class="grid gap-3">
      <Accordion>
        {#if $reasonInvalid}
          <AccordionItem open>
            <span slot="header">
              <div class="flex items-center gap-2 text-red-400">
                <InfoIcon />
                {invalidMessage}
              </div></span
            >
            <List list="disc">
              <Li liClass="mb-1 text-left whitespace-nowrap">
                Supported image formats:
                {#each imageExtensions as extension}
                  <div class="inline-block ml-2">
                    <Badge color="dark">{extension}</Badge>
                  </div>
                {/each}
              </Li>
              <Li liClass="mb-1 text-left whitespace-nowrap">
                Supported video formats:
                {#each videoExtensions as extension}
                  <div class="inline-block ml-2">
                    <Badge color="dark">{extension}</Badge>
                  </div>
                {/each}
              </Li>
              <Li liClass="mb-1 text-left whitespace-nowrap">
                Maximum image size: {FileApi.imageSizeLimit / 1024 / 1024} MB.
              </Li>
              <Li liClass="mb-1 text-left whitespace-nowrap">
                Maximum video size: {FileApi.videoSizeLimit / 1024 / 1024} MB.
              </Li>
            </List>
          </AccordionItem>
        {:else}
          <AccordionItem open>
            <span slot="header">
              <div class="flex items-center gap-2 text-red-400">
                <InfoIcon />
                There was an error while uploading the file.
              </div>
            </span>
            <p class="text-left">{$reasonUploadFail}</p>
          </AccordionItem>
        {/if}
      </Accordion>
      <Button class="lg:w-40" on:click={() => stage.set('ready-to-upload')}>
        Try again
      </Button>
    </div>
  </Card>
</div>
