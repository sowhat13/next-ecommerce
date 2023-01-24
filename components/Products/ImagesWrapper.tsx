import GImage from '../Global/GImage'
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from "framer-motion"
import Icons from '../UI/Icons'
import useWindowDimensions from '../../hooks/useWindowDimensions'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { EffectFade, FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

function ImagesWrapper(props: any) {
    const carouselItems = props.images || []
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const { width, height }: any = useWindowDimensions();
    const [variants, setVariants] = useState(
        {
            open: {
                position: "fixed", zIndex: 1000, width: width + 'px', height: height + 'px', borderRadius: 0, top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.8)',
                transition: {
                    backgroundColor: { duration: 0.3, delay: 0.5, ease: [0.6, 0.01, -0.05, 0.9] },
                }
            }
        }
    )

    useEffect(() => {
        setVariants({
            open: {
                position: "fixed", zIndex: 1000, width: width + 'px', height: height + 'px', borderRadius: 0, top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.8)',
                transition: {
                    backgroundColor: { duration: 0.3, delay: 0.5, ease: [0.6, 0.01, -0.05, 0.9] },
                }
            }
        })
    }, [width, height])
    return (
        <>
            <AnimatePresence>
                <motion.div className='flex flex-col w-full h-full items-center justify-center rounded-2xl relative overflow-hidden cursor-pointer'
                    onClick={() => {
                        if (isOpen) {
                            setIsOpen(false)
                        }
                    }}
                    animate={isOpen ? "open" : "closed"}
                    //@ts-ignore
                    variants={variants}
                >
                    {isOpen &&
                        <div className='position absolute top-4 left-4 z-10 text-white'>
                            {activeIndex + 1}/{carouselItems.length}
                        </div>
                    }
                    {isOpen &&
                        <div className='position absolute top-4 right-8 z-10 text-white'
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            <span className='text-white  cursor-pointer'>
                                <Icons icon='xmark' size="20" />
                            </span>
                        </div>
                    }

                    <Swiper
                        spaceBetween={10}
                        modules={[Thumbs, Navigation]}
                        className='w-[96%] h-full flex items-center justify-center'
                        navigation={{
                            nextEl: '.swiperButtonNextProduct',
                            prevEl: '.swiperButtonPrevProduct',
                        }}
                        //@ts-ignore

                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}

                        rewind={true}
                        onSlideChange={(swiper) => { setActiveIndex(swiper.activeIndex) }}

                    >

                        {
                            /* @ts-ignore */
                            [...carouselItems].map((x, i) => {
                                return <SwiperSlide key={x.id}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!isOpen) {
                                            setIsOpen(true)
                                        }
                                        return
                                    }}
                                    className={'w-full h-full flex items-center justify-center '}

                                >
                                    {!isOpen ?
                                        <GImage
                                            src={x.url}
                                            alt={'Product image'}
                                            //@ts-ignore
                                            sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 400px"
                                            width={369}
                                            height={540}
                                            quality={100}
                                            priority={i === 0 ? true : false}
                                            className={'rounded-md object-contain max-w-[99%] max-h-[99%] ' + (isOpen ? 'w-fit h-fit max-w-[95vw] max-h-[80vh] object-contain rounded-md' : '')}
                                            onClick={(e: any) => {
                                                if (isOpen) {
                                                    e.stopPropagation()
                                                }
                                            }}
                                            style={{  objectFit: 'contain', borderRadius: '0.5rem' }}
                                        />
                                        : <GImage
                                            src={x.url}
                                            alt={'Product image'}
                                            //@ts-ignore

                                            width={width}
                                            height={height}
                                            quality={100}
                                            className={'rounded-md object-contain ' + (isOpen ? 'w-fit h-fit max-w-[95vw] max-h-[80vh] object-contain rounded-md' : '')}
                                            onClick={(e: any) => {
                                                if (isOpen) {
                                                    e.stopPropagation()
                                                }
                                            }}
                                        />
                                    }

                                </SwiperSlide>
                            }
                            )
                        }
                    </Swiper>
                    <div
                        className='flex w-full items-center justify-center absolute gap-1  bottom-4 left-[50%] transform -translate-x-[50%] z-10 overflow-hidden'

                    >

                        <Swiper
                            //@ts-ignore
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={(isOpen && width > 767) ? 10 : 5}
                            freeMode={false}
                            watchSlidesProgress={true}
                            watchOverflow={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className='w-full h-fit flex items-center justify-center gap-2'

                        >
                            {
                                /* @ts-ignore */
                                [...carouselItems].map((x, i) => {
                                    return <SwiperSlide
                                        className={'flex w-1/5 items-center justify-center ' + (isOpen && width > 767 ? 'w-1/10' : '')}
                                        key={x.id}
                                        onClick={(e: any) => {
                                            e.stopPropagation()
                                        }}
                                    >

                                        <div
                                            className={'w-[70%] h-12 flex items-center justify-center rounded-lg border-2 overflow-hidden bg-gray-100 '
                                                + (i === activeIndex ? ' border-primary-500 d3-shadow2 ' : '') + ' ' + (isOpen && width > 767 ? 'h-24' : '')}
                                        >
                                            <GImage
                                                src={x.url}
                                                alt={x.title}
                                                sizes="(max-width: 768px) 240px, (max-width: 1200px) 240px, (max-width: 1480px) 240px, 192px"
                                                width={200}
                                                height={300}
                                                quality={100}
                                                className={'w-full h-full object-scale-down'}
                                            />
                                        </div>
                                    </SwiperSlide>
                                }
                                )
                            }

                        </Swiper>
                    </div>
                    <div className={"swiperButtonPrevProduct z-10 "}
                        onClick={(e: any) => {
                            if (isOpen) {
                                e.stopPropagation()
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>

                    <div className={"swiperButtonNextProduct z-10 "}
                        onClick={(e: any) => {
                            e.stopPropagation()
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}




export default ImagesWrapper