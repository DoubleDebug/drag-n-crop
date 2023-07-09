<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let text = '';
  let intervalId: NodeJS.Timer;
  let dots = ['.'];

  onMount(() => {
    intervalId = setInterval(() => {
      dots = [...dots, '.'];
      if (dots.length === 4) dots = ['.'];
    }, 500);
  });

  onDestroy(() => {
    if (!intervalId) return;
    clearInterval(intervalId);
  });
</script>

<span>
  {text}{dots.join('')}
</span>
