import Icons from '../UI/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, addCartItems } from "../../store/cartSlice";
import GImage from '../../components/Global/GImage'
function ShopCart() {

    const { t } = useTranslation(['sign', 'common'])
    const dispatch = useDispatch();
    //@ts-ignore
    const selectUser = useSelector((state) => state.user.user)
    //@ts-ignore
    const cartItems: any = useSelector((state) => state.cart.cart);
    const [itemCount, setItemCount] = useState(0)
    const [changedItem, setChangedItem]: any = useState(null)
    async function getCartAsync() {
        //@ts-ignore

        dispatch(getCartItems())
    }
    useEffect(() => {
        if (cartItems && cartItems?.products?.length > 0) {
            const count = cartItems?.products?.reduce((a: any, b: any) => a + b.quantity, 0)
            setItemCount(count)
        } else {
            setItemCount(0)
        }
        if (cartItems && cartItems.lastChangedItem) {
            setChangedItem(cartItems?.lastChangedItem)
            setTimeout(() => {
                setChangedItem(null)
            }, 14000)
        }

    }, [cartItems])

    useEffect(() => {
        getCartAsync()

    }, [selectUser])

    return (
        <>
            <AnimatePresence>
                <button
                    type="button"
                    className="relative rounded-full h-9 w-9 flex items-center justify-center bg-primary-100 dark:bg-opacity-10 mx-3  p-1 text-primary-400 hover:text-primary-500 hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
                >
                    <span className="sr-only">Shop Cart</span>

                    {(itemCount && itemCount > 0) ?
                        <AnimatePresence>
                            <motion.span className='absolute d3-shadow3 -top-2 -left-1 text-xs font-medium bg-green-300 dark:bg-green-200 text-orange-500 flex w-5 h-5 items-center justify-center rounded-full'
                                animate={{ scale: [0.5, 1, 1.2, 1], opacity: [0, 0.5, 1, 1], y: [-10, -5, 0, 0] }}
                                transition={{ times: [0, 0.3, 0.9, 1] }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >{itemCount}</motion.span>
                        </AnimatePresence> : null
                    }
                    <Icons className="w-5 h-5" icon='cart' />

                </button>
            </AnimatePresence>
            <AnimatePresence>
                {cartItems && changedItem ?
                    <motion.div className='w-[280px] absolute right-[0%] z-[100] bg-primary-500 rounded-xl h-12 text-white flex items-center gap-2 px-2 cursor-pointer'
                        initial={{ y: 40 }}
                        animate={{ y: 60 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={() => setChangedItem(null)}
                    >
                        <div className='flex justify-center items-center w-[30px] h-[30px] min-w-[30px] min-h-[30px] ring-1 ring-offset-2 ring-primary-700 ring-offset-primary-600 rounded-full overflow-hidden'>
                        <GImage className='rounded-full' src={changedItem?.cover?.url || changedItem?.images[0]?.url } width={30} height={30} alt={"Last changed item"}></GImage>

                        </div>
                        <span className='max-w-[100%] text-ellipsis2 text-sm'>
                        {changedItem.title}
                        </span> 
                        <span className='max-w-[80px] min-w-[80px] flex flex-wrap justify-end items-center ml-auto text-xs'>
                        {changedItem.price?.price.toFixed(2)} $
                        </span> 
                    </motion.div> : null

                }
            </AnimatePresence>
        </>
    )
}


export default ShopCart