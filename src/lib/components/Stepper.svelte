<script>
  import { Steps } from 'svelte-steps';
  import { steps } from './steps';
  import { stepNumber } from '../../stores/state';
</script>

<Steps
  vertical
  {steps}
  current={$stepNumber}
  primary="var(--orange)"
  clickable={false}
/>
