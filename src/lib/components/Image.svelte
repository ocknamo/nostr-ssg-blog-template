<script lang="ts">
	import type { ImageSrc } from './Image.type';

	export let src: ImageSrc;

	// Set default value
	src = { ...src, blur: src.blur === undefined ? true : src.blur };

	export let style: string;

	let loadStatus: 'loading' | 'loaded' = 'loading';
	let imageWrapperStyle = '';

	if (src.placeholder) {
		style = src.placeholder.dataUri
			? `${style} background: url(${src.placeholder.dataUri}) no-repeat center/cover;`
			: style;
		imageWrapperStyle = src.placeholder.color ? `background-color: ${src.placeholder.color}` : '';
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

<div class="picture-wrapper" style={imageWrapperStyle}>
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
</div>

<style>
	.image-blur-loading {
		animation:
			0.5s linear 0s normal waiting,
			0.4s ease-in 0.5s normal show;
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

	.picture-wrapper {
		width: fit-content;
		height: fit-content;
	}

	img {
		display: block;
	}
</style>
