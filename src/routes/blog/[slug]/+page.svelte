<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
</script>

<hgroup>
	{#if !!data.blog.image}
		<img class="image" src={data.blog.image} alt="thumbnail" />
	{/if}
	<h1>{data.blog.title}</h1>
	<p class="naddress">
		naddress: <a
			href={'https://nostter.app/' + data.blog.naddress}
			target="_blank"
			rel="noopener noreferrer">{data.blog.naddress}</a
		>
	</p>
	<p class="summary">{data.blog.summary}</p>
	<div class="tags">
		{#each data.blog.hashTags as htag}
			<a
				href={'https://nostter.app/search?q=' + encodeURIComponent('#') + htag}
				target="_blank"
				rel="noopener noreferrer">#{htag}</a
			>
		{/each}
	</div>
</hgroup>
<hr />
<div class="contents">
	<SvelteMarkdown source={data.blog.content}></SvelteMarkdown>
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

	hgroup {
		margin: 8px 20px;
		max-width: 800px;
	}

	hgroup img {
		min-width: 100%;
		height: 320px;
		object-fit: cover;
	}

	hgroup .naddress {
		font-size: 0.8rem;
	}

	hgroup .summary {
		border: solid 1px #888;
		border-radius: 8px;
		padding: 4px;
	}

	.tags a {
		margin-right: 10px;
	}
</style>
