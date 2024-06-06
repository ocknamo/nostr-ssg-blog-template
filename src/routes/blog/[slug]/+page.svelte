<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { browser } from '$app/environment';

	export let data;

	// お手製のfailbackのPoC
	// 雑な実装なので作り込む必要がありそう
	// widthなどの値も渡したい
	const optimazerPrefix =
		'https://nostr-image-optimizer.ocknamo.com/image/width=1600,quality=50,format=';

	let src = {
		img: `${optimazerPrefix}webp/${data.blog.image}`,
		webp: [`${optimazerPrefix}webp/${data.blog.image}`],
		jpeg: [`${optimazerPrefix}jpeg/${data.blog.image}`]
	};

	const handleImgError = (e: Event) => {
		if (e.type !== 'error') {
			return;
		}

		// failback
		src = {
			img: data.blog.image,
			webp: [data.blog.image],
			jpeg: [data.blog.image]
		};
	};
</script>

<hgroup>
	<div class="image-wrapper">
		{#if !!data.blog.image && browser}
			<picture>
				<source srcset={src.jpeg[0]} type="image/jpeg" />
				<source srcset={src.webp[0]} type="image/webp" />
				<img src={src.img} alt="my top" on:error={handleImgError} loading="lazy" />
			</picture>
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
