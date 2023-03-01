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
import "swiper/css/keyboard";


// import required modules
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper";

function ImagesWrapper(props: any) {
    const carouselItems = props.images || []
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const { windowWidth, windowHeight }: any = useWindowDimensions();
    const [variants, setVariants] = useState(
        {
            open: {
                position: "fixed", zIndex: 1000, width: windowWidth + 'px', height: windowHeight + 'px', borderRadius: 0, top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.8)',
                transition: {
                    backgroundColor: { duration: 0.3, delay: 0.5, ease: [0.6, 0.01, -0.05, 0.9] },
                }
            }
        }
    )

    useEffect(() => {
        setVariants({
            open: {
                position: "fixed", zIndex: 1000, width: windowWidth + 'px', height: windowHeight + 'px', borderRadius: 0, top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.8)',
                transition: {
                    backgroundColor: { duration: 0.3, delay: 0.5, ease: [0.6, 0.01, -0.05, 0.9] },
                }
            }
        })
    }, [windowWidth, windowHeight])

    useEffect(() => {
        //@ts-ignore
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            //@ts-ignore
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // useEffect(() => {
    //     setActiveIndex(0)
    // }, [carouselItems]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event?.key === 'Escape') {
            setIsOpen(false)
        }
    };

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
                    onHoverStart={() => { setIsHovered(true) }}
                    onHoverEnd={() => { setIsHovered(false) }}
                >

                    <div className='position unselectable absolute top-4 left-4 z-10 text-white h-8 w-8 text-xs d3-shadow rounded-full flex items-center justify-center font-medium bg-button-gradient4'>
                        <small>{activeIndex + 1}&nbsp;/&nbsp;</small>
                        {carouselItems.length}
                    </div>
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
                    {!isOpen && <AnimatePresence>
                        {isHovered &&
                            <motion.div className='position absolute flex bg-primary-400 p-2 px-3 top-0 rounded-full items-center justify-center z-10 text-white'
                                transition={{ duration: 0.5 }}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 10 }}
                                exit={{ opacity: 0, y: -50 }}
                                onClick={() => {
                                    setIsOpen(true)
                                }}
                            >
                                <span className=" text-xs font-medium">
                                    {props.clickToExpand}&nbsp;
                                </span>
                                <Icons icon="search" className="!w-4 !h-4" />

                            </motion.div>
                        }
                    </AnimatePresence>}

                    <Swiper
                        spaceBetween={10}
                        modules={[Thumbs, Navigation, Keyboard]}
                        className='w-[96%] h-full flex items-center justify-center'
                        navigation={{
                            nextEl: '.swiperButtonNextProduct',
                            prevEl: '.swiperButtonPrevProduct',
                        }}
                        //@ts-ignore

                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        keyboard={
                            {
                                enabled: true,
                                onlyInViewport: false,
                            }
                        }
                        rewind={true}
                        onSlideChange={(swiper) => { setActiveIndex(swiper.activeIndex) }}
                    >
                        {
                            /* @ts-ignore */
                            [...carouselItems].map((x, i) => {
                                return <SwiperSlide key={i}

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
                                            sizes="(max-width: 768px) 400px,
                                        (max-width: 1200px) 400px"
                                            width={369}
                                            height={540}
                                            quality={100}
                                            priority={i === 0 ? true : false}
                                            className={'rounded-md object-contain max-w-[95%] max-h-[95%] ' + (isOpen ? 'w-fit h-fit max-w-[95vw] max-h-[80vh] object-contain rounded-md' : '')}
                                            onClick={(e: any) => {
                                                if (isOpen) {
                                                    e.stopPropagation()
                                                }
                                            }}
                                            style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
                                        />
                                        : <GImage

                                            src={x.url}
                                            alt={'Product image'}
                                            //@ts-ignore

                                            width={windowWidth}
                                            height={windowHeight}
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
                            slidesPerView={(isOpen && windowWidth > 767) ? 10 : 5}
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
                                        className={'flex w-1/5 items-center justify-center  ' + (isOpen && windowWidth > 767 ? 'w-1/10' : '')}
                                        key={i}
                                        onClick={(e: any) => {
                                            e.stopPropagation()
                                        }}
                                    >

                                        <div
                                            className={'w-[70%] h-12 flex items-center transition justify-center rounded-lg border-2 border-primary-200 overflow-hidden bg-gray-100 '
                                                + (i === activeIndex ? ' !border-[3px] !border-primary-500  ' : '') + ' ' + (isOpen && windowWidth > 767 ? 'h-24' : '')}
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