<script lang="ts">
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import SvelteSeo from 'svelte-seo';
</script>

<div class="flex flex-col items-start justify-center gap-2 px-4 py-8 md:p-24">
	<Terminal />
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
		type: 'website'
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Terminal Chat | by noiseRandom',
		description: 'A terminal-inspired AI chat interface that runs on your browser.',
		site: '@tahayvr'
	}}
/>
