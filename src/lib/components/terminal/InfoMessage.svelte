<script lang="ts">
	import TermSign from './TermSign.svelte';
</script>

<div class="flex flex-row items-start gap-2 font-mono text-sm">
	<TermSign />
	<p>
		Hey, I'm an LLM model running on your local machine. Well, in your browser to be exact. You can
		use this terminal to chat with me! <br />
		Type <span class="text-yellow-500">/help</span> to see available commands.<br /> I'm still under
		development, so please be patient with me!
	</p>
</div>
