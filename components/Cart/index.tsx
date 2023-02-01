import styles from './cart.module.scss'
import Icons from '../UI/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import GImage from '../../components/Global/GImage'
import { useSelector, useDispatch } from "react-redux";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../UI/Spinner'
import { addCartItems } from "../../store/cartSlice";
import { useState, useEffect } from 'react'
import Button from '@/components/UI/Button'
import Currency from '@/utils/currency'

function Cart(props: any) {
    const { t } = useTranslation(['common'])
    const [loadingAddToCart, setLoadingAddToCart]: any = useState(null)
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const addToCart = async (product: any) => {

        setLoadingAddToCart(product._id)
        //@ts-ignore
        await dispatch(addCartItems(product)).then((res: any) => {
            if (res.code === 200) {
                console.log(res)
            } else {
            }
            setLoadingAddToCart(null)
        }
        )

    }
    //@ts-ignore
    const cartItems: any = useSelector((state) => state.cart.cart);
    const cartProducts = cartItems.products
    const checkPrices = (products: any) => {
        let totalPrice = 0
        let totalDiscount = 0
        products.forEach((product: any) => {
            const price = product.product?.price
            if (price?.isDiscount) {
                totalDiscount += (price?.oldPrice - price?.price) * product.quantity
            }
            if (price?.price) {
                totalPrice += price?.price * product.quantity
            }
        })
        setTotalPrice(totalPrice)
        setTotalDiscount(totalDiscount)
    }

    useEffect(() => {
        if (cartProducts) {
            checkPrices(cartProducts)
        }
    }, [cartProducts])

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
                                <div className='flex flex-col w-full max-w-[92%] h-full overflow-y-auto overflow-x-hidden mx-auto bg-primary-100 border border-primary-200 dark:border-primary-600 dark:bg-gray-800 dark:bg-opacity-25 rounded-lg'>
                                    {
                                        cartProducts.map((cartItem: any, index: number) => {
                                            return (
                                                <AnimatePresence key={index}>
                                                    <motion.div
                                                        className={`w-full flex flex-col items-center relative p-2 cursor-pointer border-b dark:text-white border-primary-200 bg-primary-200/30 dark:bg-primary-200/20 dark:border-gray-900/20`}
                                                        initial={{ x: -100 }}
                                                        animate={{ x: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                    >
                                                        {
                                                            cartItem?.product?._id == loadingAddToCart ?
                                                                <div className='flex w-full shine absolute left-0 top-0 h-full'></div> : null
                                                        }
                                                        <motion.div className='flex items-center gap-2 w-full h-12'>
                                                            <div className='flex justify-center items-center w-[30px] h-[30px] min-w-[30px] min-h-[30px] ring-1 ring-offset-2 ring-primary-700/50 ring-offset-primary-600/50 rounded-full overflow-hidden'>
                                                                <GImage className='rounded-full' src={cartItem?.product?.cover?.url || cartItem?.product?.images[0]?.url}
                                                                    width={30} height={30} alt={cartItem?.product?.title}></GImage>
                                                            </div>
                                                            <span className='max-w-[100%] text-ellipsis2 text-sm'>
                                                                {cartItem?.product?.title}
                                                            </span>

                                                            <div className="flex flex-col ml-auto mr-1 items-end justify-center max-w-[80px] min-w-[80px]">
                                                                {(() => {
                                                                    if (cartItem?.product?.price?.isDiscount) {
                                                                        return (<span className={'text-xs text-red-500 line-through'}>
                                                                            <span className='sr-only'>Old Price: </span>
                                                                            {Currency(cartItem?.product?.price?.oldPrice)}
                                                                        </span>)
                                                                    }
                                                                })()}
                                                                <span className='items-center ml-auto text-sm font-medium'>
                                                                    {Currency(cartItem?.product?.price?.price)}

                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                        <div className='relative grid grid-cols-10 gap-[2px] w-full'>
                                                            <div className='col-span-3 relative flex'>
                                                                {loadingAddToCart && cartItem?.product?._id == loadingAddToCart ?
                                                                    <AnimatePresence>
                                                                        <motion.div className='absolute left-0 bottom-0 flex w-fit h-fit'
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            transition={{ duration: 0.5, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                                        >
                                                                            <Spinner className=' border-primary-500 bottom-2'></Spinner>
                                                                        </motion.div>
                                                                    </AnimatePresence>
                                                                    : null}
                                                            </div>
                                                            <div className='flex items-center justify-between mx-auto gap-2 w-fit h-8 bg-primary-200 rounded-xl px-2 mt-2 col-span-4'>
                                                                <div className='flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 bg-opacity-20 text-primary-400 hover:bg-opacity-10 transition'>
                                                                    <Icons icon="minus" className=" !w-5 !h-5 cursor-pointer" size="12" ></Icons>
                                                                </div>

                                                                <span className={`min-w-[28px] flex justify-center text-primary-700 ${cartItem?.product?._id == loadingAddToCart ? '!text-green-600' : ''}`}>
                                                                    {cartItem?.quantity}

                                                                </span>
                                                                <div
                                                                    onClick={() => { addToCart(cartItem?.product) }}
                                                                    className='flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 bg-opacity-20 text-primary-400 hover:bg-opacity-10 transition'>
                                                                    <Icons icon="plus" className=" !w-5 !h-5 cursor-pointer" size="12" ></Icons>
                                                                </div>
                                                            </div>
                                                            <div className='col-span-3 '>
                                                                {cartItem?.quantity > 1 ? <div className='flex w-full h-full items-center justify-end px-1 text-[12px] break-all font-thin'>
                                                                    +{Currency((cartItem.quantity * cartItem?.product?.price?.price))}
                                                                </div> : null
                                                                }
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
                            <div className='flex flex-col gap-2 w-full min-h-[120px] h-fit p-4 mt-auto'>
                                <div className='flex justify-between items-center flex-wrap'>
                                    <span className='text-sm font-medium text-primary-500 flex dark:text-primary-300'>
                                        <span className='!w-[100px]'> Total Discount:</span> <span className='ml-1 text-green-600 dark:text-green-400'>{Currency(totalDiscount)}</span>
                                    </span>
                                    <span className='text-sm font-medium text-primary-500 flex  dark:text-primary-300'>
                                        <span className='!w-[100px]'> Total Price:</span> <span className='ml-1 text-primary-900 dark:text-primary-200'>{Currency(totalPrice)}</span>
                                    </span>


                                </div>
                                <div className="flex w-full h-full">
                                    <Button className='min-w-full' text={'Checkout'} onClick={() => { return }}></Button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}




export default Cart