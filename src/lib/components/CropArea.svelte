<script>
  import { imageUrl } from '../../stores/state';
</script>

<div class="flex relative w-[400px] h-[400px]">
  <div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tmp"
  />
  {#if imageUrl}
    <img src={$imageUrl} alt="Cropping resource" />
  {/if}
</div>

<style>
  .tmp {
    box-shadow: 0 0 0 200px rgba(0, 0, 0, 0.8);
  }
</style>
