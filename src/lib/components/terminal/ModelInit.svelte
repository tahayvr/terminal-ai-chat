<script lang="ts">
	import { mlcEngine } from '$lib/utils/mlcEngine'; // Import the updated store object
	import { createEventDispatcher } from 'svelte';

	// Get the specific store we need
	const progressStore = mlcEngine.progress;
	const dispatch = createEventDispatcher();

	let modelLoaded = $state(false);

	$effect(() => {
		if ($progressStore === 'Model loaded successfully!') {
			modelLoaded = true;
			dispatch('modelLoaded', true);
		}
	});
</script>

{#if $progressStore}
	<p class="text-left font-mono text-sm lowercase">{$progressStore}</p>
{:else}
	<p class="text-left font-mono text-sm">Initializing...</p>
{/if}
