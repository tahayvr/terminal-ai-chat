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
	title="Terminal Chat | by noiseRandom"
	description="A terminal-inspired AI chat interface that runs on your browser."
	canonical="https://chat.taha.gg"
	keywords="AI, chat, terminal, web, browser, noiseRandom, taha.gg"
	openGraph={{
		title: 'Terminal Chat | by noiseRandom',
		description: 'A terminal-inspired AI chat interface that runs on your browser.',
		url: 'https://chat.taha.gg',
		type: 'website',
		images: [
			{
				url: 'https://chat.taha.gg/images/teminal-chat-thumb.webp',
				width: 1200,
				height: 630,
				alt: 'Terminal Chat interface screenshot'
			}
		]
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Terminal Chat | by noiseRandom',
		description: 'A terminal-inspired AI chat interface that runs on your browser.',
		site: '@tahayvr',
		image: 'https://chat.taha.gg/images/teminal-chat-thumb.webp'
	}}
/>
