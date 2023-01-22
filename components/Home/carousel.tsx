import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { EffectFade, FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

import styles from './carousel.module.scss'
import GImage from '../Global/GImage'

const carouselItems = [
    {
        id: 1,
        title: 'The cow looking at your eyes so deeply',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque omnis nisi molestiae voluptates, deserunt temporibus praesentium odio modi aliquam iste quisquam delectus cupiditate sint ducimus pariatur aliquid culpa. Exercitationem, libero.",
        url: "https://i.seadn.io/gae/-MGmppNkYquxPTSXYeeQI5Ddjm-BdFKVs-GMPA_SFbGseRQRPcFaKcc5RdxfAiMmBDVetZ3Nky-L50xW8jHAldTuV9dSfarWt3oF?auto=format&w=1200"
    },
    {
        id: 2,
        title: 'Cow man',
        description: "Copierbond A4 80gr Fotokopi Kağıdı 5x500=2500 Adet (1 Koli) 0016",
        url: "https://i.seadn.io/gae/2-uErKCb5eZSTuwERTNotRKAYbWgByt57mqTKuF8s3lAFGbiYL3a9TdrMxYxncyb9PwP4ypvftt28kdDP9wa7kBWFxA1Ofr7N-Gd0wA?auto=format&w=1200"
    },
    {
        id: 3,
        title: 'Cuba days',
        description: "Copierbond A4 80gr Fotokopi Kağıdı 5x500=2500 Adet (1 Koli) 0016",
        url: "https://i.seadn.io/gae/XdJeu2Q-AKVDjqRyNsSgMFNZxMnYFpz5DMI6qa7s5Gwq8D2hO6fHEKJGpEcuib9syOZHw3BCEFOTOJIEvDx9SVkj-uVHqTxd9xuk?auto=format&w=1200"
    },
    {
        id: 4,
        title: 'Monk',
        description: "Copierbond A4 80gr Fotokopi Kağıdı 5x500=2500 Adet (1 Koli) 0016",
        url: "https://i.seadn.io/gae/nLNrRCEVwzGfyf5Qa8d2qkk0btGSao80iXYQbknWiH-wSJEdTDBW9qHArAUIc_JlCB7oWhivcwWoiXbZSjqDor6bfS0xvepF_Vei?auto=format&w=1200"
    },
    {
        id: 5,
        title: 'Sand city',
        description: "Copierbond A4 80gr Fotokopi Kağıdı 5x500=2500 Adet (1 Koli) 0016",
        url: "https://i.seadn.io/gae/FjyLectVC6cBkl7XBd5lq1xxTOXUMhe2qS8l870N_dFh0GdUQNlYwzPjMQGl59yHwqA_OoGfBsbSMGYAUtcYynzQWAVysvAcEGbzgZg?auto=format&w=1200"
    },
]


function Carousel(props: object) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className={styles.swiperContainer}>
            <div className="swiperButtonPrev">
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div className="swiperButtonNext">
                <FontAwesomeIcon icon={faAngleRight} />
            </div>

            <Swiper
                //@ts-ignore
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={false}
                watchSlidesProgress={true}
                watchOverflow={true}
                direction={"vertical"}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiperThumbWrapper}
                breakpoints={{
                    0: {
                        direction: "horizontal"
                    },
                    769: {
                        direction: "vertical"
                    }
                }}
            >
                {
                    /* @ts-ignore */
                    [...carouselItems].map((x, i) => {
                        return <SwiperSlide key={x.id}>
                            <div className={styles.swiperThumb}>
                                <GImage
                                    src={x.url}
                                    alt={x.title}
                                    sizes="(max-width: 768px) 240px, (max-width: 1200px) 240px, (max-width: 1480px) 240px, 192px"
                                    width={216}
                                    height={168}
                                    quality={100}
                                    className={styles.carouselImage}
                                />
                            </div>
                            <div className={styles.swiperThumbTitle}>{x.title}</div>
                        </SwiperSlide>
                    }
                    )
                }

            </Swiper>
            <Swiper
                spaceBetween={0}
                effect={"fade"}
                rewind={true}
                modules={[EffectFade, FreeMode, Thumbs, Autoplay, Navigation]}
                preventInteractionOnTransition={true}
                watchSlidesProgress={true}
                watchOverflow={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                //@ts-ignore
                //@ts-ignore
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className={styles.swiperWrapper}
                navigation={{
                    nextEl: '.swiperButtonNext',
                    prevEl: '.swiperButtonPrev',
                }}
            >

                {
                    /* @ts-ignore */
                    [...carouselItems].map((x, i) => {
                        return <SwiperSlide key={x.id}>

                            <GImage
                                src={x.url}
                                alt={x.description}
                                //@ts-ignore
                                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 1200px, (max-width: 1480px) 1432px, 1200px"
                                width={1432}
                                height={460}
                                quality={100}
                                priority={i === 0 ? true : false}
                                className={styles.carouselImage}
                            />
                            <div className={styles.swiperDescription}><span>{x.description}</span></div>
                        </SwiperSlide>
                    }
                    )
                }
            </Swiper>
        </div>
    );
};


export {
    Carousel
}