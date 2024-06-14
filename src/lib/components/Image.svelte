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
		blur?: boolean;
	}
	export let src: ImageSrc;

	// Set default value
	src = { ...src, blur: src.blur === undefined ? true : src.blur };

	export let style: string;

	let loadStatus: 'loading' | 'loaded' = 'loading';

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

	const handleLoaded = () => {
		loadStatus = 'loaded';
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
		class={src.blur ? `image-blur-${loadStatus}` : ''}
		src={src.img}
		alt={src.alt}
		on:error={handleImgError}
		on:load={handleLoaded}
		loading="lazy"
	/>
</picture>

<style>
	.image-blur-loading {
		animation:
			0.8s linear 0s normal waiting,
			0.4s ease-in 0.8s normal show;
	}

	.image-blur-loaded {
		filter: blur(0px);
		opacity: 1;
	}

	@keyframes waiting {
		from {
			opacity: 0;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes show {
		from {
			filter: blur(20px);
			opacity: 0.5;
		}
		to {
			filter: blur(10px);
			opacity: 1;
		}
	}
</style>
