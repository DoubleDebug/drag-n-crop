<script>
  import { Heading, List, Li } from 'flowbite-svelte';
  import {
    originalFileSize,
    croppedFileSize,
    timeElapsed,
  } from '../../../stores/state';
  import { formatElapsedTime } from '../../../utils/download';

  $: time = formatElapsedTime($timeElapsed);
</script>

<div class="grid gap-2 text-white">
  <Heading tag="h3" class="text-white">Results</Heading>
  <List list="disc">
    <Li>
      Time elapsed:
      <span class="float-right">{time}</span></Li
    >
    <Li>
      Original file size:
      <span class="float-right"> {$originalFileSize} MB</span>
    </Li>
    <Li>
      Cropped file size:
      <span class="float-right"> {$croppedFileSize} MB</span>
    </Li>
  </List>
</div>
