import styles from './cards.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import GImage from '../Global/GImage'
import { motion, AnimatePresence } from "framer-motion"
import { useState, Fragment } from 'react'


function Card(props: object) {
    const [isButtonHover, setisButtonHover] = useState(false)
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}> <strong>Copierbond</strong> A4 80gr Fotokopi Kağıdı 5x500=2500 Adet (1 Koli) 0016</div>
                <div className={styles.cardCategory}>Vip Collection</div>

            </div>

            <div className={styles.cardImageWrapper} >
                <motion.div style={{display:'flex', width:'100%', height:'100%'}} whileHover={{ scale: 1.2 }} transition={{duration:0.5}} >
                    <GImage
                        src="https://i.seadn.io/gae/mFj06UpEc5YfzmF0anF5nEBZH8c0Vp4PfhMbG-AdWrMcLONBrGsaROxeI2hZ__WL03SO4Nu5q80dA5FA6gl-Q-EudHxiCf5kLPnJAA?auto=format&w=1000"
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
                            if (true) {
                                return (<span className={styles.cardPriceButtonDiscountText}>
                                    <FontAwesomeIcon icon={faAngleDown} /> 2500.92 USDT
                                </span>)
                            }
                        })()}
                        <span className={styles.cardPriceButtonText}>
                            1500.92 USDT
                        </span>
                    </button>
                </div>

                    <motion.button className={styles.cardBuyButton}
                        onMouseEnter={() => setisButtonHover(true)}
                        onMouseLeave={() => setisButtonHover(false)}
                        whileHover={{ scale: 1.05 }}
                    >
                <AnimatePresence>

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
                </AnimatePresence>

                        <FontAwesomeIcon icon={faCartShopping} />
                    </motion.button>

            </div>
        </div>
    )
}

function CardsWrapper(props: any) {


    return (
        <div>
            <div className='flex w-full px-6 mt-8 h-20 '>
                <h1 className='font-semibold gradient-text bg-button-gradient2  text-center text-3xl sm:text-5xl md:text-6xl flex items-center'>{props.title}</h1>
                <button className='ml-auto text-center flex items-center text-base px-4 py-1 bg-button-gradient3 transition hover:opacity-80 text-white font-medium h-fit my-auto rounded-full'>Show All</button>
            </div>
            <div className={styles.cardsWrapper} style={{ minWidth: `${33}% !important` }} >
                {props.cards}
            </div>
        </div>
    )
}




export {
    Card,
    CardsWrapper
}