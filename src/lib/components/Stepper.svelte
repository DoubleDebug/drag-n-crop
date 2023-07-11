<script>
  import UploadIcon from '$lib/icons/UploadIcon.svelte';
  import SelectIcon from '$lib/icons/SelectIcon.svelte';
  import DownloadIcon from '$lib/icons/DownloadIcon.svelte';

  import { Steps } from 'svelte-steps';
  import { screenWidth, stepNumber } from '../../stores/state';

  const steps = [
    {
      text: 'Upload file',
      icon: UploadIcon,
    },
    {
      text: 'Select an area',
      icon: SelectIcon,
    },
    {
      text: 'Download result',
      icon: DownloadIcon,
    },
  ];

  $: isSmallScreen = $screenWidth >= 768;
</script>

{#if isSmallScreen}
  <Steps
    vertical
    {steps}
    current={$stepNumber}
    primary="var(--orange)"
    clickable={false}
  />
{:else}
  <Steps
    {steps}
    current={$stepNumber}
    primary="var(--orange)"
    clickable={false}
  />
{/if}
