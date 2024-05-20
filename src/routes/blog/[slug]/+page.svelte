<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
</script>

<h1>{data.id}</h1>
<hr />
<div class="contents">
	<SvelteMarkdown source={data.content}></SvelteMarkdown>
</div>
<hr />
<p>
	Visit <a href="https://github.com/ocknamo/nostr-ssg-blog-template">nostr-ssg-blog-template</a> to read
	the documentation
</p>

<style>
	.contents {
		margin: 0 20px;
		max-width: 800px;
	}
</style>
