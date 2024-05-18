<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	export let data;

	const { content } = JSON.parse(data.eventString);
</script>

<h1>SSG nostr Event PoC</h1>
<hr />
<SvelteMarkdown source={content}></SvelteMarkdown>
<hr />
<p>
	Visit <a href="https://github.com/ocknamo/poc-nostr-ssg">poc-nostr-ssg</a> to read the documentation
</p>
