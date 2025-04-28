<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { mlcEngine } from '$lib/stores/mlcEngine';
	let { children } = $props();

	// Initialize the engine when the layout mounts
	onMount(() => {
		mlcEngine.initialize();
	});
</script>

{@render children()}
