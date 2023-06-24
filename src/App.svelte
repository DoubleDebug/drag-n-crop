<script lang="ts">
  import Dropzone from '$lib/components/Dropzone.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import { stage } from './stores/global';
  import { Steps } from 'svelte-steps';
  import UploadIcon from 'svelte-icons/md/MdFileUpload.svelte';
  import SelectIcon from 'svelte-icons/md/MdTabUnselected.svelte';
  import LoadingIcon from 'svelte-icons/fa/FaSpinner.svelte';
  import DownloadIcon from 'svelte-icons/md/MdFileDownload.svelte';

  let steps = [
    {
      text: 'Upload file',
      icon: UploadIcon,
    },
    {
      text: 'Select an area',
      icon: SelectIcon,
    },
    {
      text: 'Wait for result',
      icon: LoadingIcon,
    },
    {
      text: 'Download file',
      icon: DownloadIcon,
    },
  ];
</script>

<div class="flex justify-center mt-24 h-[80vh]">
  <div class="grid text-center h-min w-[800px]">
    <Heading />
    <p>Stage is: {$stage}</p>
    <div class="flex">
      <Steps vertical {steps} primary="var(--orange)" />
      <Dropzone />
    </div>
  </div>
</div>
