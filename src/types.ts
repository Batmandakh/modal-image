import type { CSSProperties } from "react";

export type ImageSize = undefined | {
    width: number;
    height: number;
};

export type ImageOrientation = undefined | {
    type: 'portrait' | 'landscape' | 'square' | undefined;
    angle: number;
};

export type ImageProps = {
    src: string;
    srcSet?: string;
    sizes?: string;
    alt?: string;
    className?: string;
    width?: number; // pixels
    height?: number; // pixels
    loading?: 'eager' | 'lazy';
    crossOrigin?: 'anonymous' | 'use-credentials';
    ismap?: 'ismap' | boolean; // if the image is map, modal should be disabled
    useMap?: string; // #mapname and if there's a map name modal should be disabled
    referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url';
    
    onClick?: () => void;
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
    ref?: React.RefObject<HTMLImageElement | null>;
    style?: CSSProperties;
}

export type ModalProps = {
    noModal?: 'noModal' | boolean;
    noPicture?: 'noPicture' | boolean;
    noFitScreen?: 'noFitScreen' | boolean;
    showDownload?: 'showDownload' | boolean;
    hideRotate?: 'hideRotate' | boolean;
    backgroundColor?: string;
    bgColor?: string;
}

export type ModalImageProps = ImageProps & ModalProps;
