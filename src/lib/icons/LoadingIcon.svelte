<script>
  import Icon from 'svelte-icons-pack';
  import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';
  import { stage } from '../../stores/state';

  $: isSpinning = $stage === 'uploading';
  export let spin = true;
</script>

<Icon
  src={AiOutlineLoading}
  className={isSpinning || spin ? 'fa-spin' : ''}
  color="white"
/>
