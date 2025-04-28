<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import TermSign from './TermSign.svelte';
	import { chatInputValue } from '$lib/states/chatState';

	// Create event dispatcher
	const dispatch = createEventDispatcher();

	// Using native input instead of component for simpler focus management
	let inputElement: HTMLInputElement;
	let localInputValue = $state('');

	// Sync local value with store
	$effect(() => {
		$chatInputValue = localInputValue;
	});

	// Handle key press events - this function is attached via attribute (not Svelte event)
	function handleKeyDown(event: any) {
		if (event.key === 'Enter' && localInputValue.trim()) {
			// Dispatch event to notify parent component
			dispatch('submit', localInputValue);
			// Clear the local input value
			localInputValue = '';
			// Keep focus on input
			inputElement.focus();
		}
	}

	onMount(() => {
		// Focus input when component is mounted
		if (inputElement) {
			inputElement.focus();
		}
	});
</script>

<div class="flex flex-row items-center justify-center gap-2 text-green-400">
	<TermSign />
	<input
		type="text"
		class="w-full border-none bg-transparent p-0 font-mono text-sm outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
		bind:this={inputElement}
		bind:value={localInputValue}
		onkeydown={handleKeyDown}
	/>
</div>
