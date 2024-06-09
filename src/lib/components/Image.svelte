<script lang="ts">
	interface Srcset {
		src: string;
		w: number;
	}

	interface ImageSrc {
		img: string;
		webp?: Srcset[];
		jpeg?: Srcset[];
		png?: Srcset[];
		failback: string;
		alt: string;
	}
	export let src: ImageSrc;

	export let style: string;

	const handleImgError = (e: Event) => {
		if (e.type !== 'error') {
			return;
		}

		// failback
		src = {
			img: src.failback,
			webp: [],
			jpeg: [],
			png: [],
			alt: src.alt,
			failback: src.failback
		};
	};
</script>

<picture>
	{#if src.webp}
		<source srcset={src.webp.map((s) => `${s.src} ${s.w}w`).join(', ')} type="image/webp" />
	{/if}
	{#if src.jpeg}
		<source srcset={src.jpeg.map((s) => `${s.src} ${s.w}w`).join(', ')} type="image/jpeg" />
	{/if}
	{#if src.png}
		<source srcset={src.png.map((s) => `${s.src} ${s.w}w`).join(', ')} type="image/png" />
	{/if}
	<img {style} src={src.img} alt={src.alt} on:error={handleImgError} loading="lazy" />
</picture>
