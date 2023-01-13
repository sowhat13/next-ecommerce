import Image from "next/image";
import { useEffect, useState } from "react";
import type { NextPage } from 'next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons'


interface ImageFallbackProps {
    src: string;
    fallbackSrc?: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
    quality?: number;
    priority?: boolean;
    rest?: any;
    sizes?: string;
}

const ImageFallback: NextPage<ImageFallbackProps> = ({ src, fallbackSrc, ...rest }) => {
    const [imgSrc, set_imgSrc] = useState(src);
    const [isLoading, set_isLoading] = useState(true);
    const [isError, set_isError] = useState(false);

    useEffect(() => {
        set_imgSrc(src);
    }, [src]);

    return (
        <>
            {!isError ? <Image
                {...rest}
                alt={rest.alt || ""}
                src={imgSrc}
                draggable={false}
                className={rest.className + ` ${isLoading ? 'shiny-element' : ' unselectable'}`}
                onLoadingComplete={(result) => {
                    set_isLoading(false)

                    if (result.naturalWidth === 0) {
                        // Broken image
                        set_isError(true);
                    }
                }}
                onError={() => {
                    set_isError(true);
                }}
            /> : isError && fallbackSrc ? <Image
                {...rest}
                alt={rest.alt || ""}
                src={fallbackSrc}
                className={rest.className + ` ${isLoading ? 'shiny-element' : ''}`}
                onLoadingComplete={(result) => {
                    set_isLoading(false)

                    if (result.naturalWidth === 0) {

                        set_isError(true);
                    }
                }}
                onError={() => {
                    set_isError(true);

                }}
            /> : <div className={rest.className + ' md:!rounded-md bg-gray-900 flex justify-center items-center text-center text-sky-200 overflow-hidden'} >
                {/* @ts-ignore */}
                <FontAwesomeIcon style={{ width: "30px", height: "30px", marginRight: "10px" }} icon={faLinkSlash}></FontAwesomeIcon>
                😔</div>}
        </>
    );
}

export default ImageFallback;