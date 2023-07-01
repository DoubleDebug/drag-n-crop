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

<style>
  :global(.steps-container) {
    justify-self: center;
  }

  @media only screen and (max-width: 768px) {
    :global(.steps-container) {
      width: 100%;
      max-width: 500px;
    }
  }

  @media only screen and (max-width: 400px) {
    :global(.steps-container) {
      max-width: 400px;
    }

    :global(.steps__label) > :global(div) {
      font-size: 1rem;
    }
  }
</style>
