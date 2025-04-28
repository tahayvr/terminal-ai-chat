<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { chatInputValue } from '$lib/states/chatState';
	import TermSign from './TermSign.svelte';
	// Create event dispatcher
	const dispatch = createEventDispatcher();

	// Using native textarea instead of component for simpler focus management
	let textareaElement: HTMLTextAreaElement;
	let localInputValue = $state('');

	// Sync local value with store
	$effect(() => {
		$chatInputValue = localInputValue;
	});

	// Handle key press events - this function is attached via attribute (not Svelte event)
	function handleKeyDown(event: any) {
		if (event.key === 'Enter' && !event.shiftKey && localInputValue.trim()) {
			event.preventDefault(); // Prevent default newline
			// Dispatch event to notify parent component
			dispatch('submit', localInputValue);
			// Clear the local input value
			localInputValue = '';
			// Keep focus on textarea
			textareaElement.focus();
		}
	}

	// Adjust textarea height based on content
	function adjustHeight() {
		if (textareaElement) {
			textareaElement.style.height = 'auto';
			textareaElement.style.height = `${textareaElement.scrollHeight}px`;
		}
	}

	$effect(() => {
		// Adjust height when content changes
		if (localInputValue) adjustHeight();
	});

	onMount(() => {
		// Focus textarea when component is mounted
		if (textareaElement) {
			textareaElement.focus();
			adjustHeight();
		}
	});
</script>

<div class="text-green-400">
	<div class="flex flex-row items-start justify-center gap-2 text-sm">
		<TermSign />
		<textarea
			class="max-h-[300px] min-h-[24px] w-full resize-none overflow-hidden border-none bg-transparent p-0 font-mono text-sm outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
			bind:this={textareaElement}
			bind:value={localInputValue}
			onkeydown={handleKeyDown}
			oninput={adjustHeight}
			rows="1"
		></textarea>
	</div>
</div>
