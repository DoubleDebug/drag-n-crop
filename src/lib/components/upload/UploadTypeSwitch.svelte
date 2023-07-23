<script>
  import { ButtonGroup, Button } from 'flowbite-svelte';
  import { uploadType } from '../../../stores/state';

  const handleSwitch = () => {
    uploadType.update((type) => (type === 'file' ? 'url' : 'file'));
  };
</script>

<ButtonGroup>
  <Button
    color={$uploadType === 'file' ? 'primary' : 'none'}
    on:click={handleSwitch}
    class="group-btn"
  >
    File
  </Button>
  <Button
    color={$uploadType === 'url' ? 'primary' : 'none'}
    on:click={handleSwitch}
    class="group-btn"
  >
    URL
  </Button>
</ButtonGroup>
