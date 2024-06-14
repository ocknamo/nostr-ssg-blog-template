export interface Srcset {
	src: string;
	w: number;
}

export interface ImageSrc {
	img: string;
	w?: number;
	h?: number;
	webp?: Srcset[];
	jpeg?: Srcset[];
	png?: Srcset[];
	failback: string;
	alt: string;
	placeholder?: {
		dataUri?: string;
		color?: string;
	};
	blur?: boolean;
}
