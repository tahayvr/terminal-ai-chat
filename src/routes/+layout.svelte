<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { mlcEngine } from '$lib/utils/mlcEngine';
	import Github from '$lib/components/Github.svelte';
	let { children } = $props();

	// Initialize the engine when the layout mounts
	onMount(() => {
		mlcEngine.initialize();
	});
</script>

{@render children()}

<div class="absolute right-2 top-2">
	<Github />
</div>
