<script>
  import { Heading, Progressbar } from 'flowbite-svelte';
  import LoadingLabel from '../LoadingLabel.svelte';
  import { uploadPercentage } from '../../../stores/state';

  $: percentage = Math.round($uploadPercentage).toString();
</script>

<div class="grid w-full gap-2 min-h-[300px] place-items-center">
  <Heading
    class="text-center mt-12 md:mt-0 md:text-left self-end"
    customSize="text-2xl"
  >
    <LoadingLabel text="Uploading your file" />
  </Heading>
  <div class="flex w-full justify-center self-start">
    <Progressbar progress={percentage} size="h-4" labelInside />
  </div>
</div>
