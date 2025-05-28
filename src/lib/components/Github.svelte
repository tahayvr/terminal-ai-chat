<script lang="ts">
	import GithubLogo from '@lucide/svelte/icons/github';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button
	variant="ghost"
	size="icon"
	href="https://github.com/tahayvr/terminal-chat-llm"
	rel="noopener noreferrer"
	target="_blank"
>
	<GithubLogo class="h-4 w-4" />
	<span class="sr-only">Github Repo Link</span>
</Button>
