<script>
  import Icon from 'svelte-icons-pack';
  import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';
  import { stage } from '../../stores/state';

  $: spin = $stage === 'uploading';
</script>

<Icon src={AiOutlineLoading} className={spin ? 'fa-spin' : ''} />
