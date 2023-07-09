<script>
  import Icon from 'svelte-icons-pack';
  import SelectIcon from 'svelte-icons-pack/ai/AiOutlineSelect';
  import { stage } from '../../stores/state';

  $: isSelectStage = $stage === 'ready-to-crop';
</script>

<Icon src={SelectIcon} color={isSelectStage ? 'white' : 'black'} />
