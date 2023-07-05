<script>
  import { Steps } from 'svelte-steps';
  import { steps } from './steps';
  import { screenWidth, stepNumber } from '../../stores/state';

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
