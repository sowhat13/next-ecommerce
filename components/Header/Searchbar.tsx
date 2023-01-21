import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import lodash from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import api from '../../api';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from "framer-motion"

function SearchBar(props: any) {
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [inputFocused, setInputFocused] = useState(false);

    const [searchedProducts, setSearchedProducts] = useState([]);
    const debounce = lodash.debounce
    async function search(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        const value: string = event?.target.value ? event.target.value : '';
        if (value && value.length > 0) {
            setLoading(true)
            await api.request('/products', { limit: 5, term: value, select: "title slug" }).then((productsRes) => {
                if (productsRes?.code === 200) {
                    setSearchedProducts(productsRes?.data)
                    setTimeout(() => {
                        setLoading(false)
                    }, 300)
                }
            })

            console.log(searchedProducts, 'products')
        }
    }

    const debouncedResults = useMemo(() => {
        return debounce(search, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });



    const handlePreSearch = () => {
        setSearchTerm(''); setInputFocused(false);
        //@ts-ignore
        document.getElementById('searchbar').value = ''
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            //@ts-ignore

            router.replace(`/products?search=${document.getElementById('searchbar').value}`)
        }
    };

    return (
        <div className='flex w-full justify-center items-center '>
            <AnimatePresence>
                <div className="flex w-fit max-w-[500px]  lg:w-full h-9 rounded-2xl px-4  items-center bg-primary-100 relative" onKeyPress={handleKeyPress}>
                    <input id='searchbar' className='bg-transparent outline-none hidden md:flex flex-auto'
                        onChange={debouncedResults} onFocus={() => { setInputFocused(true) }} onBlur={() => { setTimeout(() => { setInputFocused(false) }, 200) }}
                        type="text" placeholder='Search...' />
                    {/* @ts-ignore */}
                    <Link replace href={`/products?search=${typeof window !== "undefined" ? document.getElementById('searchbar').value : searchTerm}`}>
                        <MagnifyingGlassIcon className='h-8 rounded-full w-8 cursor-pointer text-primary-600 hover:bg-primary-200 p-1'></MagnifyingGlassIcon>
                    </Link>
                    {(searchTerm && searchTerm.length > 0 && inputFocused) &&
                        <motion.div className='w-full flex flex-col absolute top-10 left-0 min-h-9 h-fit rounded-lg p-2 z-50 justify-center bg-white shadow-lg dark:primary-800'
                            transition={{ duration: 0.3 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            {loading && <motion.div className='flex items-center w-full h-8 shiny-element rounded-full shadow-lg'
                                transition={{ duration: 0.3 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >&nbsp;</motion.div>}
                            {(!loading && searchTerm.length > 0 && searchedProducts.length == 0) &&
                                <div className='flex items-center w-full p-2 bg-primary-100 text-primary-600 rounded-xl shadow-lg'>No products found...</div>}
                            {searchedProducts && searchedProducts.length > 0 && searchedProducts.map((product: any) => {
                                return <Link href={`/products/${product.slug}`} key={product._id} onClick={() => { handlePreSearch() }}
                                    className='flex items-center w-full p-2 hover:bg-primary-300 cursor-pointer rounded-xl text-primary-600 '>{product.title}</Link>
                            })}
                        </motion.div>
                    }
                </div>
            </AnimatePresence>
        </div>
    )
}



export default SearchBar