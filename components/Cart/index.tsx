import styles from './cart.module.scss'
import Icons from '../UI/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import GImage from '../../components/Global/GImage'
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "../../store/cartSlice";
import { useState } from 'react'
import Button from '@/components/UI/Button'
function Cart(props: any) {
    const { t } = useTranslation(['common'])
    const [loadingAddToCart, setLoadingAddToCart] = useState(false)
    const dispatch = useDispatch();
    const addToCart = async (product: any) => {

        setLoadingAddToCart(true)
        //@ts-ignore
        await dispatch(addCartItems(product)).then((res: any) => {
            if (res.code === 200) {
                console.log(res)
            } else {
            }
            setLoadingAddToCart(false)

        }
        )

    }
    //@ts-ignore
    const cartItems: any = useSelector((state) => state.cart.cart);
    const cartProducts = cartItems.products
    return (
        <>
            <AnimatePresence>
                {props.isCartOpen &&
                    <motion.div
                        transition={{ duration: 0.5 }}
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        className={`${styles.cartContainer} `}>
                        <div className={`${styles.cartWrapper} relative`}>
                            <div className="flex justify-between items-center w-full h-fit pt-8 pb-4 px-7 text-primary-700 dark:text-primary-300">
                                <div className="flex items-center justify-center">
                                    <h3 className=' flex px-2 text-2xl font-medium '>
                                        Cart
                                    </h3>
                                    <div className="flex rounded-full bg-primary-500 bg-opacity-20 text-primary-400 px-2 ml-2">
                                        Total: {props.itemCount}
                                    </div>
                                </div>


                                <div className="h-7 w-7 flex justify-center items-center rounded-full bg-gray-500 bg-opacity-20 hover:bg-opacity-10 transition"
                                    onClick={() => { props.toggleCart() }}>
                                    <Icons icon="arrowRight" className=" !w-5 !h-5 cursor-pointer" size="12" ></Icons>

                                </div>
                            </div>
                            {cartProducts && cartProducts.length > 0 ?
                                <div className='flex flex-col hover-scrollbar gap-1 max-w-[92%] h-full overflow-y-auto overflow-x-hidden mx-auto bg-primary-100 border border-primary-200 dark:border-primary-600 dark:bg-primary-900 dark:bg-opacity-30 rounded-lg'>
                                    {
                                        cartProducts.map((cartItem: any, index: number) => {
                                            return (
                                                <AnimatePresence key={index}>
                                                    <motion.div
                                                        className='w-full flex flex-col items-center p-2 cursor-pointer border-b border-primary-200 dark:border-gray-900'
                                                        initial={{ x: -100 }}
                                                        animate={{ x: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                    >
                                                        <motion.div className='flex items-center gap-2 w-full h-12'>
                                                            <div className='flex justify-center items-center w-[30px] h-[30px] min-w-[30px] min-h-[30px] ring-1 ring-offset-2 ring-primary-700/50 ring-offset-primary-600/50 rounded-full overflow-hidden'>
                                                                <GImage className='rounded-full' src={cartItem?.product?.cover?.url || cartItem?.product?.images[0]?.url}
                                                                    width={30} height={30} alt={cartItem?.product?.title}></GImage>
                                                            </div>
                                                            <span className='max-w-[100%] text-ellipsis2 text-sm'>
                                                                {cartItem?.product?.title}
                                                            </span>
                                                            <span className='max-w-[80px] min-w-[80px] flex flex-wrap justify-end items-center ml-auto text-xs'>
                                                                {cartItem?.product?.price?.price?.toFixed(2)} $
                                                            </span>
                                                        </motion.div>
                                                        <div>
                                                            <div className='flex items-center justify-between gap-2 w-full h-8 bg-primary-200 rounded-xl px-2'>
                                                                <div className='flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 bg-opacity-20 text-primary-400 hover:bg-opacity-10 transition'>
                                                                    <Icons icon="minus" className=" !w-5 !h-5 cursor-pointer" size="12" ></Icons>
                                                                </div>

                                                                <span className='min-w-[20px] flex justify-center'>
                                                                    {cartItem?.quantity}
                                                                </span>
                                                                <div
                                                                    onClick={() => { addToCart(cartItem?.product) }}
                                                                    className='flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 bg-opacity-20 text-primary-400 hover:bg-opacity-10 transition'>
                                                                    <Icons icon="plus" className=" !w-5 !h-5 cursor-pointer" size="12" ></Icons>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>

                                            )
                                        }
                                        )

                                    }
                                </div>
                                : null

                            }
                            <div className='flex flex-col gap-2 w-full h-24 p-4'>
                                <Button text={'Checkout'} onClick={() => {return}}></Button>
                            </div>
                        </div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}




export default Cart