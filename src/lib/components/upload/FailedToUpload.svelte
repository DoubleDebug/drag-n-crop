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
                <span class="text-2xl md:text-normal"><InfoIcon /></span>
                {invalidMessage}
              </div></span
            >
            <List list="disc">
              <Li liClass="error-list-item">
                Supported image formats:
                {#each imageExtensions as extension}
                  <div class="inline-block ml-2">
                    <Badge color="dark">{extension}</Badge>
                  </div>
                {/each}
              </Li>
              <Li liClass="error-list-item">
                Supported video formats:
                {#each videoExtensions as extension}
                  <div class="inline-block ml-2">
                    <Badge color="dark">{extension}</Badge>
                  </div>
                {/each}
              </Li>
              <Li liClass="error-list-item">
                Maximum image size: {FileApi.imageSizeLimit / 1024 / 1024} MB.
              </Li>
              <Li liClass="error-list-item">
                Maximum video size: {FileApi.videoSizeLimit / 1024 / 1024} MB.
              </Li>
            </List>
          </AccordionItem>
        {:else}
          <AccordionItem open>
            <span slot="header">
              <div class="flex items-center gap-2 text-red-400">
                <span class="text-2xl md:text-base"><InfoIcon /></span>
                There was an error while uploading the file.
              </div>
            </span>
            <p class="text-left min-h-[100px]">{$reasonUploadFail}</p>
          </AccordionItem>
        {/if}
      </Accordion>
      <Button
        class="ml-auto lg:w-40"
        on:click={() => stage.set('ready-to-upload')}
      >
        Try again
      </Button>
    </div>
  </Card>
</div>
