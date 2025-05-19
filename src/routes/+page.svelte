<script lang="ts">
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import SvelteSeo from 'svelte-seo';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-start justify-center gap-2 px-4 py-8 md:p-24">
	<Terminal systemPrompt={data.systemPrompt} />
</div>

<SvelteSeo
	title="Terminal Chat LLM | by noiseRandom"
	description="A web-based AI chat application with a terminal-inspired UI, built with Sveltekit and MLC Web LLM"
	canonical="https://chat.taha.gg"
	keywords="AI, chat, terminal, web, browser, noiseRandom, taha.gg"
	openGraph={{
		title: 'Terminal Chat LLM | by noiseRandom',
		description:
			'A web-based AI chat application with a terminal-inspired UI, built with Sveltekit and MLC Web LLM',
		url: 'https://chat.taha.gg',
		type: 'website',
		images: [
			{
				url: 'https://chat.taha.gg/images/terminal-chat-llm-banner.webp',
				width: 1200,
				height: 630,
				alt: 'Terminal Chat interface screenshot'
			}
		]
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Terminal Chat LLM | by noiseRandom',
		description:
			'A web-based AI chat application with a terminal-inspired UI, built with Sveltekit and MLC Web LLM',
		site: '@tahayvr',
		image: 'https://chat.taha.gg/images/terminal-chat-llm-banner.webp'
	}}
/>
