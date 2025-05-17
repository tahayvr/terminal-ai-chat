<script lang="ts">
	import ChatInput from './ChatInput.svelte';
	import ModelInit from './ModelInit.svelte';
	import TermSign from './TermSign.svelte';
	import AiResponse from './AiResponse.svelte';
	import { tick } from 'svelte';
	import { mlcEngine } from '$lib/utils/mlcEngine';
	import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm';
	import InfoMessage from './InfoMessage.svelte';
	import type { CommandResult } from '$lib/utils/commandHandler';

	// Define props
	const { systemPrompt = 'You are a helpful AI assistant that provides concise answers.' } =
		$props<{
			systemPrompt?: string;
		}>();

	// Get store handles
	const { engine, ready, progress } = mlcEngine;

	let isModelLoaded = $state(false);
	let showInput = $state(false);
	let chatInputComponent = $state<InstanceType<typeof ChatInput> | null>(null);

	// Scroll to bottom of the terminal
	let element = $state<HTMLElement | any>(null);
	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	// Type for usage statistics
	type UsageStats = {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
		[key: string]: any;
	};

	// Chat history and state
	let messages = $state<{ role: string; content: string; usage?: UsageStats | null }[]>([]);
	let isGenerating = $state(false);
	let currentInputId = $state(0);

	function handleModelLoaded() {
		isModelLoaded = true;
		// Add a slight delay before showing input to ensure proper mounting and focusing
		setTimeout(() => {
			showInput = true;
		}, 100);
	}

	// Handle command from ChatInput
	function handleCommand(event: { detail: CommandResult }) {
		const command = event.detail;

		// Add the command to chat history if it should be shown
		if (command.showInChat) {
			// Use 'assistant' role to leverage markdown rendering for command responses
			messages = [
				...messages,
				{
					role: 'assistant',
					content: command.response || '',
					usage: null
				}
			];
		}

		// Execute command actions
		if (command.action === 'clear') {
			messages = [];
		} else if (command.action === 'export') {
			exportChat();
		}

		// Scroll to bottom after command execution
		setTimeout(() => {
			scrollToBottom(element);
		}, 100);
	}

	// Export chat history as markdown
	function exportChat() {
		if (messages.length === 0) return;

		// Format messages as markdown
		const markdown = messages
			.map((msg) => {
				if (msg.role === 'user') {
					return `## User:\n${msg.content}\n`;
				} else if (msg.role === 'assistant') {
					return `## Assistant:\n${msg.content}\n`;
				} else {
					return `## System:\n${msg.content}\n`;
				}
			})
			.join('\n');

		// Create a blob and download link
		const blob = new Blob([markdown], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `terminal-chat-export-${new Date().toISOString().slice(0, 10)}.md`;
		a.click();

		// Clean up
		URL.revokeObjectURL(url);
	}

	async function handleChatSubmit(event: { detail: string }) {
		const userMessage = event.detail;
		if (!userMessage.trim() || isGenerating) return;

		// Add user message to history
		messages = [...messages, { role: 'user', content: userMessage }];
		isGenerating = true;

		// Create a new input for next message
		currentInputId++;

		// Clear the input value for the next input
		if (chatInputComponent) {
			chatInputComponent.clearInput();
		}

		try {
			// Build message history for the API
			const apiMessages: ChatCompletionMessageParam[] = [
				{
					role: 'system',
					content: systemPrompt
				},
				...messages.map((msg) => ({
					role: msg.role as 'user' | 'assistant',
					content: msg.content
				}))
			];

			// Start AI response
			let aiResponse = '';
			let finalUsage: UsageStats | null = null;

			// Add placeholder response with empty usage
			const placeholderMsg = { role: 'assistant', content: '█', usage: null as UsageStats | null };
			messages = [...messages, placeholderMsg];

			if ($engine && $ready) {
				const chunks = await $engine.chat.completions.create({
					messages: apiMessages,
					temperature: 0.7,
					stream: true,
					stream_options: { include_usage: true }
				});

				for await (const chunk of chunks) {
					const content = chunk.choices[0]?.delta.content || '';
					aiResponse += content;

					if (chunk.usage) {
						finalUsage = chunk.usage as UsageStats;
					}

					// Update the last message (the assistant's response)
					messages = messages.map((msg, i) =>
						i === messages.length - 1
							? { ...msg, content: aiResponse + '█', usage: finalUsage }
							: msg
					);

					// Scroll while generating text
					await tick();
					scrollToBottom(element);
				}

				// Finalize the assistant's response (remove cursor)
				messages = messages.map((msg, i) =>
					i === messages.length - 1 ? { ...msg, content: aiResponse, usage: finalUsage } : msg
				);
			}
		} catch (error) {
			// Show error in the UI
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			messages = [...messages, { role: 'system', content: `Error: ${errorMessage}`, usage: null }];
		} finally {
			isGenerating = false;
		}
	}
</script>

<div class="flex h-[60dvh] flex-col space-y-4 overflow-y-auto" bind:this={element}>
	<InfoMessage />
	<!-- Model status -->
	<div class="flex flex-row items-center gap-2">
		<TermSign />
		<div>
			<ModelInit on:modelLoaded={handleModelLoaded} />
		</div>
	</div>

	{#if isModelLoaded && showInput}
		<!-- Message history -->
		{#each messages as message, i}
			<div class="flex flex-row items-start justify-center gap-2 text-sm">
				<TermSign />
				<div class="flex-1">
					{#if message.role === 'user'}
						<div class="font-mono text-sm text-green-400">
							{#if message.content.startsWith('/')}
								<span class="text-yellow-500">{message.content}</span>
							{:else}
								{message.content}
							{/if}
						</div>
					{:else if message.role === 'assistant'}
						<AiResponse content={message.content} usage={message.usage} />
					{:else}
						<div>
							{message.content}
						</div>
					{/if}
				</div>
			</div>
		{/each}

		<!-- Only show input when not generating -->
		{#if !isGenerating}
			<ChatInput
				bind:this={chatInputComponent}
				on:submit={handleChatSubmit}
				on:command={handleCommand}
			/>
		{/if}
	{/if}
</div>
