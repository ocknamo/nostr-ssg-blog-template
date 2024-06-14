<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { browser } from '$app/environment';
	import Image from '$lib/components/Image.svelte';
	import type { ImageSrc } from '$lib/components/Image.type.js';

	export let data;

	// PoC
	// TODO: set from config
	const optimazerPrefix = 'https://nostr-image-optimizer.ocknamo.com/image/';

	let src: ImageSrc = {
		w: 800,
		img: `${optimazerPrefix}width=1600,quality=70,format=webp/${data.blog.image}`,
		webp: [
			{ src: `${optimazerPrefix}width=1600,quality=50,format=webp/${data.blog.image}`, w: 1600 },
			{ src: `${optimazerPrefix}width=800,quality=50,format=webp/${data.blog.image}`, w: 800 }
		],
		jpeg: [
			{ src: `${optimazerPrefix}width=1600,quality=50,format=jpeg/${data.blog.image}`, w: 1600 },
			{ src: `${optimazerPrefix}width=800,quality=50,format=jpeg/${data.blog.image}`, w: 800 }
		],
		failback: data.blog.image,
		alt: 'blog top',
		placeholder: { dataUri: data.blog.imagePlaceholderUrl, color: 'black' },
		blur: true
	};
</script>

<hgroup>
	<div class="image-wrapper">
		{#if !!data.blog.image && browser}
			<Image style="min-width: 100%;height: 320px;object-fit: cover;" {src}></Image>
		{/if}
	</div>
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

	hgroup .image-wrapper {
		height: 320px;
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
