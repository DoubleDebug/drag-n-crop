<script>
	import { Button } from 'flowbite-svelte';
	import { reasonInvalid, stage } from '../../stores/state';
</script>

<div class="grid gap-2">
	<p>{$reasonInvalid}</p>
	<Button on:click={() => stage.set('ready-to-upload')}>Try again</Button>
</div>
