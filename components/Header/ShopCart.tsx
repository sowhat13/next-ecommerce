import Icons from '../UI/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { getCartItems } from "../../store/cartSlice";
import GImage from '../../components/Global/GImage'
import Cart from '../Cart'
import Currency from '@/utils/currency'


function ShopCart() {
    
    const { t } = useTranslation(['sign', 'common'])
    const dispatch = useDispatch();
    //@ts-ignore
    const selectUser = useSelector((state) => state.user.user)
    //@ts-ignore
    const cartItems: any = useSelector((state) => state.cart.cart);
    //@ts-ignore
    const isCartOpen: any = useSelector((state) => state.cart.isCartOpen);

    const [itemCount, setItemCount] = useState(0)
    const [changedItems, setChangedItems]: any = useState([])
    let timeoutId: any = null
    async function getCartAsync() {
        //@ts-ignore

        dispatch(getCartItems())
    }

    function deleteCartItem(id: any) {
        let newArray = [...changedItems].filter((item: any) => {
            return item._id !== id
        });
        return setChangedItems(newArray)
    }

    function toggleCart(){
            dispatch(cartSlice.actions.toggleCart())
    }

    useEffect(() => {

        if (cartItems && cartItems?.products?.length > 0) {
            const count = cartItems?.products?.reduce((a: any, b: any) => a + b.quantity, 0)
            setItemCount(count)
        } else {
            setItemCount(0)
        }
        if (cartItems && cartItems.lastChangedItem) {
            clearTimeout(timeoutId);
            const newItem = { ...cartItems.lastChangedItem }
            newItem.expireDate = Date.now() + 5000
            setChangedItems([...changedItems, newItem])
        }
    }, [cartItems])

    useEffect(() => {
        let timeoutId: any = null
        if (changedItems.length) {

            timeoutId = setInterval(() => {

                let newArray = [...changedItems].filter((item: any) => {
                    return item.expireDate > Date.now()
                });
                return setChangedItems(newArray)
            }, 1000);
        }

        return () => {
            clearInterval(timeoutId);
        }
    }, [changedItems]);

    useEffect(() => {
        getCartAsync()

    }, [selectUser])

    return (
        <>
            <AnimatePresence>
                <button
                    type="button"
                    onClick={toggleCart}
                    className="relative rounded-full h-9 w-9 flex items-center justify-center bg-primary-100 dark:bg-opacity-10 mx-3  p-1 text-primary-400 hover:text-primary-500 hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
                >
                    <span className="sr-only">Shop Cart</span>

                    {(itemCount && itemCount > 0) ?
                        <AnimatePresence>
                            <motion.span 
                            className='absolute shadow-lg -top-2 -left-2 z-20 text-xs font-medium bg-green-300 dark:bg-green-200 text-orange-500 flex w-6 h-6 items-center justify-center rounded-full'
                                animate={{ scale: [0.5, 1, 1.2, 1], opacity: [0, 0.5, 1, 1], y: [-10, -5, 0, 0] }}
                                transition={{ times: [0, 0.3, 0.9, 1] }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >{itemCount}</motion.span>
                        </AnimatePresence> : null
                    }
                    {cartItems && changedItems.length > 0 ?
                        <motion.div
                            className={"w-2 h-2 rounded-full absolute flex bg-primary-300 z-5"}
                            transition={{ duration: 0.5 }}
                            initial={{ opacity: 0.5, y: -25 }}
                            animate={{ opacity: 1, y: -5 }}
                            exit={{ opacity: 0 }}
                        >
                        </motion.div> : null
                    }
                    <Icons className="w-5 h-5 absolute z-10" icon='cart' />

                </button>
            </AnimatePresence>
            <AnimatePresence>
                {cartItems && !isCartOpen && changedItems.length > 0 ?
                    <div className='flex flex-col-reverse top-[105%] absolute right-[-5px] xs:right-[3%] z-[100] gap-1'>

                        {
                            changedItems.map((changedItem: any, index: number) => {
                                return (
                                    <AnimatePresence key={index}>

                                        <motion.div
                                            className='w-[280px] bg-primary-400 relative dark:bg-primary-500 rounded-xl rounded-t-2xl d3-shadow2 text-white flex flex-col items-center p-2 cursor-pointer hover:opacity-95'
                                            initial={{ x: -100 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 0.5 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            onClick={() => { deleteCartItem(changedItem._id) }}
                                        >
                                            <span className="absolute top-3 right-3">
                                                <Icons icon="xmark" size="10" />

                                            </span>

                                            <div className={`text-sm font-medium flex justify-center w-full px-2 items-center ${changedItem.lastChange == 'add' ? ' text-green-400' : changedItem.lastChange == 'remove' ? ' text-red-500' : ''}`}
                                            >{t('common:products:added-to-cart')}</div>

                                            <motion.div className='flex items-center gap-2 w-full h-12'
                                            >
                                                <div className='flex justify-center items-center w-[30px] h-[30px] min-w-[30px] min-h-[30px] ring-1 ring-offset-2 ring-primary-700/50 ring-offset-primary-600/50 rounded-full overflow-hidden'>
                                                    <GImage className='rounded-full' src={changedItem?.cover?.url || changedItem?.images[0]?.url} width={30} height={30} alt={"Last changed item"}></GImage>

                                                </div>
                                                <span className='max-w-[100%] text-ellipsis2 text-sm'>
                                                    {changedItem.title}
                                                </span>
                                                <span className='max-w-[80px] min-w-[80px] flex flex-wrap justify-end items-center ml-auto text-xs'>
                                                    {Currency(changedItem.price?.price)}
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>

                                )
                            }
                            )

                        }
                    </div>
                    : null

                }
            </AnimatePresence>
            <Cart isCartOpen={isCartOpen} itemCount={itemCount} toggleCart={() => {toggleCart()}} />
        </>
    )
}


export default ShopCart