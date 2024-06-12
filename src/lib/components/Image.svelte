<script lang="ts">
	interface Srcset {
		src: string;
		w: number;
	}

	interface ImageSrc {
		img: string;
		w?: number;
		h?: number;
		webp?: Srcset[];
		jpeg?: Srcset[];
		png?: Srcset[];
		failback: string;
		alt: string;
		placeholder?: string;
	}
	export let src: ImageSrc;
	export let style: string;

	if (src.placeholder) {
		style = `${style} background: url(${src.placeholder}) no-repeat center/cover;`;
	}

	const handleImgError = (e: Event) => {
		if (e.type !== 'error') {
			return;
		}

		// failback
		src = {
			...src,
			img: src.failback,
			webp: [],
			jpeg: [],
			png: []
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
	<img
		width={src.w}
		height={src.h}
		{style}
		src={src.img}
		alt={src.alt}
		class="blur-animation"
		on:error={handleImgError}
		loading="lazy"
	/>
</picture>

<style>
	.blur-animation {
		animation: 0.8s ease-in normal show;
	}

	@keyframes show {
		from {
			filter: blur(10px);
			opacity: 0;
		}
		to {
			filter: blur(0px);
			opacity: 1;
		}
	}
</style>
