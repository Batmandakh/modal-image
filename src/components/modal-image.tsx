import { memo, useRef, type RefObject, type SyntheticEvent, useEffect } from "react";
import { type ModalImageProps, type ImageProps, type ImageOrientation, type ImageSize } from '../types';
import { X as CloseIcon, RefreshCcw as RotateIcon, Download} from 'lucide-react';
import { useAutohide } from "../hooks";

const ImageMemo = memo(({src, srcSet, sizes, alt, className, width, height, loading, crossOrigin, ismap, useMap, referrerPolicy, onClick, onLoad, ref, ...props}: ImageProps) => {
    return (
        <img 
            ref={ref}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={loading}
            crossOrigin={crossOrigin}
            {...{ismap: ismap}}
            useMap={useMap}
            referrerPolicy={referrerPolicy}
            onClick={onClick}
            onLoad={onLoad}
            {...props}
            />
    )
});

export function ModalImage({
    src, 
    srcSet, 
    sizes, 
    alt, 
    className,
    width,
    height,
    loading, 
    crossOrigin,
    ismap,
    useMap,
    referrerPolicy,
    onClick,
    noModal,
    noPicture,
    noFitScreen,
    hideRotate,
    showDownload, 
    ...props
}: ModalImageProps) {
    const isOpenRef = useRef(false);
    let controller = useRef<AbortController>(undefined);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuHook = useAutohide(1500);
    const menuHookRef = useRef(menuHook);
    const imageStyle = useRef('');
    const imageRef = useRef<HTMLImageElement | null>(null);
    const imageSize  = useRef<ImageSize>(undefined);
    const imageComputedSize = useRef<ImageSize>(undefined);
    const placeHolderRef = useRef<HTMLDivElement | null>(null);
    const orientationRef = useRef<ImageOrientation>(undefined);
    const setIsOpenSync = (value: boolean) => {
        isOpenRef.current = value;
        isOpenRefEffect();
    };
    const toggleModal = () => {
        setIsOpenSync(!isOpenRef.current);
    };
    const toggleOrientation = () => { // TODO: get advice or suggestions from experts after initial release. need to write to what kind of suggestion, cuz i forgot now...
        orientationRef.current = orientationRef.current ?? getImageOrientation();
        switch(orientationRef.current.angle) {
            case 0: orientationRef.current.angle = 270; break; 
            case 270: orientationRef.current.angle = 180; break;
            case 180: orientationRef.current.angle = 90; break;
            default: orientationRef.current.angle = 0; break;
        };
        display();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Esc' || event.key === 'Enter') {
            toggleModal();
        };
    };
    const handleClick = (event: MouseEvent | TouchEvent) => {
        if( event.target !== imageRef.current && 
            event.target !== menuRef.current && 
            ! menuRef.current?.contains(event.target as Node)
        ) { toggleModal(); };
    };
    const isOpenRefEffect = () => {
        // 1. clear if previous modal state persists for fresh opening
        orientationRef.current = undefined;
        imageStyle.current = '';
        // 2. prepare clean event listener controller
        controller.current && controller.current.abort();
        controller.current = new AbortController;
        // 3. check whether is it modal opening action
        if(isOpenRef.current) {
            try {
                // 3.1. replace toggleModal function of the image by toggleMenu(autohide=false)
                imageRef.current && (imageRef.current.onclick = menuHookRef.current.toggleStill);
                // 3.2. save original style
                imageStyle.current = getImageStyle();
                // 3.3. clear all image styling and class
                alterElementClass(imageRef);
                imageRef.current && (imageRef.current.style.cssText = '');
                // 3.4. check noFitScreen flag. if it exists on mobile rotate image to show full screen and ignores on desktop
                if(window.matchMedia('(max-width: 768px)').matches) {
                    noFitScreen ? orientationRef.current = getImageOrientation() : orientationRef.current = resolveAppropriateImageRotation();
                };
                // 3.5. resize image to fit in modal
                resizeImage();
            } finally {
                // 3.7. Show menu
                menuHookRef.current.show();
                // 3.8. Add event listeners for key press and mouse click
                document.addEventListener('keydown', handleKeyDown, {signal: controller.current!.signal});
                document.addEventListener('click', handleClick, {signal:controller.current!.signal});
            };
        };
        // 4. check whether is it modal closing action
        if(!isOpenRef.current) {
            try {
                // 4.1. Replace toggleMenu of Image back to toggleModal function
                imageRef.current && (imageRef.current.onclick = toggleModal);
                // 4.2. restore original image style and class
                imageRef.current && (imageRef.current.style.cssText = imageStyle.current);
                alterElementClass(imageRef, 'replaceClass', className);
            } finally { 
                // 4.3. hide menu
                menuHookRef.current.hide();
                // 4.4. Clean event listeners
                controller.current && controller.current.abort();
            };
        };
        // 5. show image in modal or as it is depending on isOpenRef.current state
        display();
    };
    const display = () => { // This has to be all CSS
        // if modal is open, following style applies
        if(isOpenRef.current) {
            // 1. hide document scroll
            alterElementClass(document.body, 'addClass', 'modal-image-body');
            // 2. make placeholderRef visible
            alterElementClass(placeHolderRef, 'removeClass', 'hide');
            // 3. expand modalRef to full screen and make it fixed modal on top layer of page
            alterElementClass(modalRef, 'replaceClass', 'modal-image-wrapper');
            // 4. make menuRef visible
            alterElementClass(menuRef, 'removeClass', 'hide');
            // 5. apply orientation 
            orientationRef.current && (
                imageRef.current?.style.setProperty('transform', `rotate(${orientationRef.current.angle}deg)`),
                resizeImage()
            );
        };
        // if modal is closed, no styling but originals of the image
        if(!isOpenRef.current) {
            // 1. hide placeholderRef
            alterElementClass(placeHolderRef, 'addClass', 'hide');
            // 2. clear all styling of modalRef
            alterElementClass(modalRef);
            // 3. hide menuRef
            alterElementClass(menuRef, 'addClass', 'hide');
            // 5. resize to original size
            imageComputedSize.current && imageRef.current && (
                imageRef.current.style.setProperty('width', imageComputedSize.current.width + 'px'),
                imageRef.current.style.setProperty('height', imageComputedSize.current.height + 'px')
            );
            imageRef.current?.style.removeProperty('transform');
            // 6. show document scroll
            alterElementClass(document.body, 'removeClass', 'modal-image-body');
            // making page scrolling back to normal, but if the page already had no scrolling(vertical) this might break!
        };
    };
    const viewportIs = () => {
        let orientationIs = window.screen.orientation ? (window.screen.orientation.type.startsWith('portrait') ? 'portrait' : 'landscape') : undefined;
        orientationIs = undefined;
        if(orientationIs === undefined) {
            if(window.innerWidth > window.innerHeight) {
                orientationIs = 'landscape';
            } else if(window.innerWidth < window.innerHeight) {
                orientationIs = 'portrait';
            } else {
                orientationIs = 'square';
            };
        };
        return orientationIs;
    };
    const resizeImage = () => {
        imageRef.current && (
            imageRef.current.style.removeProperty('width'),
            imageRef.current.style.removeProperty('height'),
            imageRef.current.style.setProperty('max-width', 'none'),
            imageRef.current.style.setProperty('max-height', 'none')
        );
        const imageWidth = imageSize.current?.width ?? imageRef.current?.width ?? 0;
        const imageHeight = imageSize.current?.height ?? imageRef.current?.height ?? 0;
        const viewport = viewportIs();
        const imageOrientation = getImageOrientation();

        if(imageOrientation.type === 'portrait') {
            // portrait viewport
            if(viewport === 'portrait' && (imageOrientation.angle === 0 || imageOrientation.angle === 180)) {
                if((imageHeight/imageWidth)*window.innerWidth > window.innerHeight) {
                    setImageSize('height', window.innerHeight);
                } else {
                    setImageSize('width', window.innerWidth);
                };
            };
            if(viewport === 'portrait' && (imageOrientation.angle === 90 || imageOrientation.angle === 270)) {
                setImageSize('height', window.innerWidth);
            };
            // landscape viewport
            if(viewport === 'landscape' && (imageOrientation.angle === 0 || imageOrientation.angle === 180)) {
                setImageSize('height', window.innerHeight);
            };
            if(viewport === 'landscape' && (imageOrientation.angle === 90 || imageOrientation.angle === 270)) {
                if((imageHeight/imageWidth)*window.innerHeight > window.innerWidth) {
                    setImageSize('height', window.innerWidth);
                } else {
                    setImageSize('width', window.innerHeight);
                };
            };
        } else if(imageOrientation.type === 'landscape') {
            // portrait viewport
            if(viewport === 'portrait' && (imageOrientation.angle === 0 || imageOrientation.angle === 180)) {
                setImageSize('width', window.innerWidth);
            };
            if(viewport === 'portrait' && (imageOrientation.angle === 90 || imageOrientation.angle === 270)) {
                if(window.innerWidth*(imageWidth/imageHeight) > window.innerHeight) {
                    setImageSize('width', window.innerHeight);
                } else {
                    setImageSize('height', window.innerWidth);
                };
            };
            // landscape viewport
            if(viewport === 'landscape' && (imageOrientation.angle === 0 || imageOrientation.angle === 180)) {
                    if((imageHeight/imageWidth)*window.innerWidth > window.innerHeight) {
                    setImageSize('height', window.innerHeight);
                } else {
                    setImageSize('width', window.innerWidth);
                };
            };
            if(viewport === 'landscape' && (imageOrientation.angle === 90 || imageOrientation.angle === 270)) {
                setImageSize('width', window.innerHeight);
            };
        } else {
            if(viewport === 'portrait') {
                setImageSize('width', window.innerWidth);
            } else {
                setImageSize('height', window.innerHeight);
            };
        };
    };
    const processImage = (element: HTMLImageElement) => {
        imageSize.current = {
            width: element.naturalWidth, 
            height: element.naturalHeight
        };
        const width = () => {return getComputedStyle(element).getPropertyValue('width')};
        const height = () => {return getComputedStyle(element).getPropertyValue('height')};
        imageComputedSize.current = {
            width: parseInt(width()),
            height: parseInt(height())
        };
        orientationRef.current = getImageOrientation();
    };
    const setImageSize = (property: 'width' | 'height', value: number) => {
        switch(property) {
            case 'width': 
                imageRef.current?.style.setProperty(property, value + 'px');
                imageRef.current?.style.setProperty('height', 'auto');
                break;
            case 'height':
                imageRef.current?.style.setProperty(property, value + 'px');
                imageRef.current?.style.setProperty('width', 'auto');
                break;
        };
    };
    const getImageStyle = () => {
        let styles = '';
        const computedStyle = imageRef.current && getComputedStyle(imageRef.current);
        if(computedStyle) {
            for(let i=0; i<computedStyle.length; i++) {
                let property = computedStyle[i];
                let value = computedStyle.getPropertyValue(property);
                styles += property + ': ' + value + '; ';
            };
        };
        return styles;
    };
    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = getImageFilename(src);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const getImageFilename = (url: string) => {
        let filename = url.split('/').pop(); // Get the last segment after splitting by '/'
        if(!filename) {
            const today = new Date();
            const hour = today.getHours();
            const formattedDate = today.toISOString().slice(0, 10);
            filename = `${formattedDate} at ${hour}`;
        };
        return filename;
    };
    const alterElementClass = (element: RefObject<HTMLDivElement | HTMLImageElement | null> | HTMLElement, action?: 'add' | 'addClass' | 'removeClass' | 'replaceClass', classString?: string | '') => {
        let alteringElement: HTMLElement | HTMLDivElement | HTMLImageElement | null;
        if('current' in element) {
            alteringElement = element.current;
        } else {
            alteringElement = element;
        };
        switch(action) {
            case 'add': alteringElement && (alteringElement.className += classString ?? '');
                break;
            case 'addClass': alteringElement && alteringElement.classList.add(classString ?? '');
                break;
            case 'removeClass': alteringElement && alteringElement.classList.remove(classString ?? '');
                break;
            default: alteringElement && (alteringElement.className = classString ?? '');
        };
    };
    const getImageOrientation = () => {
        let imageOrientation: ImageOrientation = orientationRef.current ?? {type: undefined, angle: 0};
        if(imageSize.current) {
            if(imageSize.current.width > imageSize.current.height) {
                imageOrientation.type = 'landscape';
            } else if(imageSize.current.width < imageSize.current.height) {
                imageOrientation.type = 'portrait';
            } else {
                imageOrientation.type = 'square';
            };
        };
        return imageOrientation;
    };
    const resolveAppropriateImageRotation = () => {
        let appropriateImageOrientation = getImageOrientation(); // default value
        // window.screen.width x window.screen.height will be swapped when window.screen.orientation changes...
        const screen = viewportIs();
        

        switch(appropriateImageOrientation.type) {
        case 'portrait': 
            screen === 'portrait' && (appropriateImageOrientation.angle = 0);
            screen === 'landscape' && (appropriateImageOrientation.angle = 270);
            break;
        case 'landscape': 
            screen === 'landscape' && (appropriateImageOrientation.angle = 0);
            screen === 'portrait' && (appropriateImageOrientation.angle = 90);
            break;
        case 'square': appropriateImageOrientation.angle = 0;
            break;
        };

        return appropriateImageOrientation;
    };

    useEffect(() => {
        isOpenRefEffect(); 
    }, []);

    return (
        <>
        <div ref={placeHolderRef} style={{ width: imageComputedSize.current?.width, height: imageComputedSize.current?.height}}></div>
        <figure ref={modalRef}>
            <ImageMemo 
                ref={imageRef}
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                className={className}
                width={width}
                height={height}
                loading={loading}
                {...{ismap: ismap}}
                crossOrigin={crossOrigin}
                useMap={useMap}
                referrerPolicy={referrerPolicy}
                onClick={!ismap && !useMap && onClick ? onClick : !noModal && !isOpenRef.current ? toggleModal : undefined}
                onLoad={(event: SyntheticEvent) => processImage(event.target as HTMLImageElement)}
                {...props}
            />
            <div ref={menuRef} style={{...(!isOpenRef.current && {display: 'hidden'})}}>
                <header style={{transform: menuHook.visible ? 'translateY(0)' : 'translateY(-100%)'}}>
                    {showDownload && (
                        <button type='button' id='orientation' onClick={downloadImage}>
                            <Download />
                        </button>
                    )}
                    {!hideRotate && (
                        <button type='button' id='orientation' onClick={toggleOrientation}>
                            <RotateIcon />
                        </button>
                    )}
                    <button type='button' id='close' onClick={toggleModal}>
                        <CloseIcon />
                    </button>
                </header>
                <footer ref={menuRef} style={{transform: menuHook.visible ? 'translateY(0)' : 'translateY(100%)'}}>
                    {alt}
                </footer>
            </div>
        </figure>
        </>
    )
}

export default ModalImage
