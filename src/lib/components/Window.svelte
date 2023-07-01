<script>
  import { screenHeight, screenWidth } from '../../stores/state';
</script>

<svelte:window
  bind:innerWidth={$screenWidth}
  bind:innerHeight={$screenHeight}
/>
