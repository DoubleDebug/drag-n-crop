<script>
  import Icon from 'svelte-icons-pack';
  import BsDownload from 'svelte-icons-pack/bs/BsDownload';
  import { stage } from '../../stores/state';

  $: isDownloadStage = $stage === 'success';
</script>

<Icon src={BsDownload} color={isDownloadStage ? 'white' : 'black'} />
