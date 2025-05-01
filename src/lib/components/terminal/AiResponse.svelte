<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	// Props
	const { content, usage } = $props<{
		content: string;
		usage?: any | null;
	}>();

	let parsedContent = $state<string | null>(null);

	// Format large numbers with comma separators
	function formatNumber(num: number): string {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	// Parse markdown to HTML
	$effect(() => {
		if (content) {
			parseMarkdown();
		}
	});

	async function parseMarkdown() {
		try {
			parsedContent = await marked(content);
		} catch (error) {
			console.error('Error parsing markdown:', error);
			parsedContent = content; // Fallback to plain text
		}
	}

	onMount(() => {
		parseMarkdown();
	});
</script>

<div class="flex flex-row items-start justify-center gap-2">
	<div class="flex-1">
		<div
			class="prose prose-sm prose-zinc max-w-none font-mono text-foreground dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-ul:pl-6 dark:prose-pre:bg-muted"
		>
			{#if parsedContent}
				{@html parsedContent}
			{:else}
				<div class="whitespace-pre-wrap">{content}</div>
			{/if}
		</div>
		{#if usage}
			<div class="mt-2">
				<!-- Basic token info -->
				<div class="font-mono text-xs text-gray-500">
					<span class="text-gray-400">$</span> tokens <span class="text-blue-400">--in</span>
					{formatNumber(usage.prompt_tokens)} <span class="text-green-400">--out</span>
					{formatNumber(usage.completion_tokens)} <span class="text-purple-400">--total</span>
					{formatNumber(usage.total_tokens)}
				</div>

				<!-- Show full JSON if needed -->
				<div class="mt-1 flex flex-row items-start gap-2 font-mono text-xs text-gray-500">
					<span class="text-gray-400">$</span>
					<details>
						<summary class="cursor-pointer hover:text-gray-300">
							show <span class="text-red-400">--all-data</span>
						</summary>
						<pre class="mt-1 overflow-x-auto pl-4">{JSON.stringify(usage, null, 2)}</pre>
					</details>
				</div>
			</div>
		{/if}
	</div>
</div>
