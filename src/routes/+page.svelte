<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	export let data;

	const { content } = JSON.parse(data.eventString);
</script>

<h1>SSG nostr Event PoC</h1>
<hr />
<div class="main-content">
	<SvelteMarkdown source={content}></SvelteMarkdown>
</div>
<hr />
<p>
	Visit <a href="https://github.com/ocknamo/poc-nostr-ssg">poc-nostr-ssg</a> to read the documentation
</p>

<style>
	.main-content {
		margin: 0 20px;
		max-width: 800px;
	}
</style>
