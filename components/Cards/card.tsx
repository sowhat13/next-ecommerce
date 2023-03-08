import styles from './cards.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCartShopping, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import GImage from '../Global/GImage'
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'next-i18next'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, addCartItems } from "../../store/cartSlice";
import Icons from '../UI/Icons';
import Currency from '@/utils/currency'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/keyboard";


// import required modules
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper";
import { transform } from 'lodash'

function Card(props: any) {
    const [isButtonHover, setisButtonHover] = useState(false)
    const router = useRouter()
    const [loadingAddToCart, setLoadingAddToCart] = useState(false)
    const [successAddToCart, setSuccessAddToCart] = useState('')

    const dispatch = useDispatch();
    const addToCart = async () => {
        if (successAddToCart || loadingAddToCart) return;

        setLoadingAddToCart(true)
        //@ts-ignore
        await dispatch(addCartItems(props.item)).then((res: any) => {
            console.log(res)

            if (res.code === 200) {
                setSuccessAddToCart('success')

            } else {
                setSuccessAddToCart('error')
            }
            setLoadingAddToCart(false)
            setTimeout(() => {
                setSuccessAddToCart('')
            }, 2000)
        }
        )

    }

    return (
        <Link href={`/products/${props.item.slug}`} className={`${styles.cardWrapper} ${props.className ? props.className : ''}`}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}> <strong>{props.item.title.split(' ')[0]}</strong> {props.item.title.replace(/^(\S+)/, "")}</div>
                <div className={styles.cardCategory}>{props.item.collectionName?.name}</div>

            </div>

            <div className={styles.cardImageWrapper} >
                <motion.div style={{ display: 'flex', width: '100%', height: '100%' }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.5 }} >
                    <GImage
                        src={props.item.cover?.url}
                        alt="Picture of the author"
                        //@ts-ignore
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 246px,
                            246px"
                        width={400}
                        height={400}
                        className={styles.cardImage}
                    />
                </motion.div>
                <div className={styles.cardPriceButtonWrapper}>
                    <button className={styles.cardPriceButton}>

                        {(() => {
                            if (props.item.price?.isDiscount) {
                                return (<span className={styles.cardPriceButtonDiscountText}>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                    <span className='sr-only'>Old Price: </span>
                                    {Currency(props.item.price?.oldPrice, props.item.price?.currency)}
                                </span>)
                            }
                        })()}
                        <span className={styles.cardPriceButtonText}>
                            <span className='sr-only'>Price: </span>

                            {Currency(props.item.price?.price, props.item.price?.currency)}
                        </span>
                    </button>
                </div>

                <motion.button role="button" type="button" className={styles.cardBuyButton +
                    ' active:ring-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 focus:ring-offset-gray-200'}
                    onMouseEnter={() => setisButtonHover(true)}
                    onMouseLeave={() => setisButtonHover(false)}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.preventDefault()
                        addToCart()
                    }}
                >
                    <span className='sr-only'>Add to cart</span>

                    <AnimatePresence>
                        {loadingAddToCart ?
                            <motion.div
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{ opacity: 0 }}
                                className={' absolute top-0 left-0 w-full h-full overflow-hidden flex items-center rounded-[18px] justify-center'}>
                                <motion.div className='shine'
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    exit={{ opacity: 0 }}
                                ></motion.div>
                            </motion.div> : null
                        }

                    </AnimatePresence>
                    <AnimatePresence>
                        {successAddToCart === 'success' ?
                            <Icons icon="success" className="text-green-300" />
                            : successAddToCart === 'error' ?
                                <Icons icon="error" className="text-pink-400" />
                                :
                                <>
                                    {isButtonHover && (
                                        <>
                                            <motion.div
                                                className={styles.cardCartItems}
                                                transition={{ duration: 0.5 }}
                                                initial={{ opacity: 0, y: -35 }}
                                                animate={{ opacity: 1, y: -5 }}
                                                exit={{ opacity: 0, y: -20, x: -5 }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className={styles.cardCartItems}
                                                transition={{ duration: 1 }}
                                                initial={{ opacity: 0, y: -25, x: 5 }}
                                                animate={{ opacity: 1, y: -5 }}
                                                exit={{ opacity: 0, y: -20, x: -5 }}

                                            >

                                            </motion.div>
                                            <motion.div
                                                className={styles.cardCartItems}
                                                transition={{ duration: 1 }}
                                                initial={{ opacity: 0, y: -20, x: -4 }}
                                                animate={{ opacity: 1, y: -5 }}
                                                exit={{ opacity: 0, y: -20, x: -5 }}
                                            >

                                            </motion.div>
                                        </>
                                    )}
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </>
                        }
                    </AnimatePresence>

                </motion.button>

            </div>
        </Link>
    )
}

function CardsWrapper(props: any) {

    const { t } = useTranslation(['sign', 'common'])

    return (
        <div className='flex flex-col w-full'>
            {(props.title || props.titleLink) &&
                <div className='flex w-full px-6 mt-8 mb-2 h-20 '>
                    {props.title &&
                        <h1 className='font-semibold gradient-text bg-button-gradient2  text-center text-3xl sm:text-4xl md:text-5xl flex items-center'>{props.title}</h1>
                    }
                    {props.titleLink &&
                        <Link href={props.titleLink} className='ml-auto text-center flex items-center justify-center text-base px-4 py-1 bg-button-gradient3 transition hover:opacity-80 text-white font-medium h-fit my-auto rounded-full'>{t('common:show-all')}</Link>
                    }

                </div>
            }
            {
                props.swiperCards ? <SlideCard id={props.sliderId} array={props.swiperCards} />
                    :
                    <div className={styles.cardsWrapper} >
                        {props.cards}
                    </div>
            }

        </div>
    )
}

function SlideCard(props: any) {

    return (
        <div className={`flex w-full relative ${styles['swiper-container']}`}>
            <Swiper
                modules={[Thumbs, Navigation]}
                className={` w-full md:w-[94%] mx-auto h-full flex items-center justify-center ${styles['swiper-wrapper']}}`}
                navigation={{
                    nextEl: `${props.id ? (`${'.slideCardRight-' + props.id}`) : '.slideCardRight'}`,
                    prevEl: `${props.id ? (`${'.slideCardLeft-' + props.id}`) : '.slideCardLeft'}`,
                }}
                slidesPerView={4}
                breakpoints={{
                    // when window width is >= 320px
                    280: {
                        slidesPerView: 1.1,
                        spaceBetween: 0
                    },
                    620: {
                        slidesPerView: 2,
                        spaceBetween: 5
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 5
                    },
                    // when window width is >= 480px
                    1080: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },

                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 10
                    },
                    // when window width is >= 640px

                }}
                rewind={true}

            >
                {
                    [...props.array].map((x, i) => {
                        return <SwiperSlide key={i}


                            className={`w-full h-full flex items-center justify-center ${styles['swiper-slide']}`}

                        >
                            <Card className={''} item={x} />
                        </SwiperSlide>
                    }
                    )
                }
            </Swiper>
            <div className={`${props.id ? (`${'slideCardLeft slideCardLeft-' + props.id}`) : 'slideCardLeft'} bg-primary-400  z-10`}
                onClick={(e: any) => {
                    e.stopPropagation()
                }}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>

            <div className={`${props.id ? (`${'slideCardRight slideCardRight-' + props.id}`) : 'slideCardRight'} bg-primary-400  z-10`}
                onClick={(e: any) => {
                    e.stopPropagation()
                }}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </div>



        </div>
    )
}

export {
    Card,
    CardsWrapper
}