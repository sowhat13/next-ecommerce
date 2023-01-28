
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/outline'

import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import themeSlice from '../../store/themeSlice';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Sign } from './Sign'
import GImage from '../Global/GImage'
import { useTranslation } from 'next-i18next'
import Searchbar from './Searchbar'
import { motion, AnimatePresence } from "framer-motion"
import Icons from '../UI/Icons'
import ShopCart from './ShopCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const setThemeInLocalStorage = (theme: string) => {
    if (theme === 'light') {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    }
    localStorage.setItem('theme', theme);
};

function Navbar(props: any) {

    const { t } = useTranslation(['sign', 'common'])
    const dispatch = useDispatch();
    const router = useRouter()
    const [scrollPosition, setScrollPosition] = useState(0);

    const navigations = [
        { name: 'common:navbar:dashboard', href: '/', current: false },
        { name: 'common:navbar:products', href: '/products', current: false },
    ]

    let [signModal, setSignModal] = useState('')
    const [user, setUser] = useState({} as any);

    const [navigation, setNavigation] = useState(navigations);
    //@ts-ignore
    const theme = useSelector((state) => state.theme.theme);
    //@ts-ignore
    const selectUser = useSelector((state) => state.user.user)

    const signOut = () => {
        props.signOut()
    }
    const { locale, pathname, asPath, query } = router

    const handleLanguageChange = (lang: string) => {
        document.cookie = `NEXT_LOCALE=${lang}`
        setNavigation(navigations)
        router.push({ pathname, query }, asPath, { locale: lang })
    }

    useEffect(() => {
        setUser(selectUser)
    }, [selectUser])

    useEffect(() => {
        const thm = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        if (thm) {
            dispatch(themeSlice.actions.setTheme(thm));
            setThemeInLocalStorage(thm)
        }

    }, []);

    useEffect(() => {
        const currentNav = navigation.map((nav) => {
            return {
                ...nav,
                current: nav.href === router.asPath
            }
        })
        setNavigation(currentNav)
    }, [router.asPath, router.locale])


    const handleToggle = () => {
        setThemeInLocalStorage(theme === 'light' ? 'dark' : 'light')

        dispatch(themeSlice.actions.setTheme(theme === 'light' ? 'dark' : 'light'));

    };
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const fixedClass = scrollPosition > 80 ? true : false;

    const variants = {
        navbarFixed: { position: 'fixed', zIndex: 50, transition: { duration: 0.5 }, top: 0, left: 0, right: 0, boxShadow: '0 0 10px rgba(0,0,0,0.2)' },

    }

    return (
        <AnimatePresence>
            <motion.div
                animate={fixedClass ? 'navbarFixed' : ''}
                //@ts-ignore
                variants={variants}
                className={`flex w-full bg-background-color ${fixedClass}`}
            >
                {signModal && <Sign signModal={signModal} closeSign={(val: any) => { setSignModal(val) }}></Sign>}

                <Disclosure as="nav" className=" relative flex w-full">
                    {({ open }) => (
                        <>
                            <div className="flex w-full px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 w-full items-center justify-between">
                                    <div className="relative inset-y-0 left-0 flex items-center md:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="mr-1 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-1 min-w-fit items-stretch justify-start">
                                        <button onClick={() => { router.push('/') }} className="flex flex-shrink-0 items-center cursor-pointer">
                                            <div className='bg-button-gradient2 flex items-center justify-center h-10 px-4 rounded-full d3-shadow'>
                                                <FontAwesomeIcon icon={faGem} className="h-5 text-primary-50" />
                                                <span className='text-primary-50 font-medium ml-2 hidden lg:flex'>eCommerce</span>
                                            </div>

                                            {/* 
                                        <GImage
                                            src="http://app.sunvalley.vip/img/moen-n-logo-w.be05be5f.png"
                                            alt="Your Company"
                                            width={60}
                                            height={60}
                                            quality={100}
                                            priority={true}
                                            className=" h-16 w-auto block"
                                        /> */}
                                        </button>
                                    </div>
                                    <div className='w-full hidden md:flex'>
                                        <Searchbar></Searchbar>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex w-full ml-auto space-x-4">
                                            {/* <SignUp></SignUp> */}

                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}

                                                    className={classNames(
                                                        item.current ? 'bg-button-gradient2 shadow-sms text-white ' : 'text-primary-400 hover:bg-primary-400 hover:text-white',
                                                        'px-3 py-2 rounded-full text-sm font-medium transition dark:text-gray-200 whitespace-nowrap'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {t(`${item.name}`)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" inset-y-0 right-0 flex items-center pr-2  sm:inset-auto sm:ml-6 sm:pr-0">


                                        <button
                                            type="button"
                                            className="rounded-full h-9 w-9 flex items-center justify-center bg-primary-100 dark:bg-opacity-10 ml-3  p-1 text-primary-400 hover:text-primary-500 hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        <ShopCart></ShopCart>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                {user && Object.keys(user).length > 0 ? (
                                                    <Menu.Button className="flex rounded-full h-10 w-10  text-sm outline-none ring-1 ring-primary-300 ring-offset-2 ring-offset-primary-400 ">
                                                        <span className="sr-only">Open user menu</span>
                                                        {user.avatar && user.avatar.url ? (
                                                            <div className='h-10 w-10 rounded-full flex items-center justify-center bg-button-gradient3 text-green-200 d3-shadow3 overflow-hidden'>
                                                                <GImage
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={user.avatar.url}
                                                                    alt=""
                                                                    width={40}
                                                                    height={40}

                                                                />
                                                            </div>
                                                        ) : <div className="h-10 w-10 rounded-full flex items-center justify-center bg-button-gradient3 text-green-200 d3-shadow3">
                                                            <UserIconSolid className="h-6 w-6" aria-hidden="true" />
                                                        </div>}

                                                    </Menu.Button>) : (
                                                    <Menu.Button className="flex rounded-full h-10 w-10  text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400">
                                                        <span className="sr-only">Open login menu</span>
                                                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-button-gradient3 text-white">
                                                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                                                        </div>
                                                    </Menu.Button>)
                                                }

                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                {user && Object.keys(user).length > 0 ? (

                                                    <Menu.Items className="absolute cursor-pointer right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {/* <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item> */}
                                                        <Menu.Item >
                                                            {({ active }) => (

                                                                <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                    <SetLanguage title={t('common:language')} active={locale} handleLanguageChange={handleLanguageChange} />
                                                                </span>
                                                            )}

                                                        </Menu.Item>
                                                        <Menu.Item >
                                                            {({ active }) => (

                                                                <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                    <SetTheme title={t('common:theme')} dark={t('common:dark')} light={t('common:light')} theme={theme} handleToggle={handleToggle} />
                                                                </span>
                                                            )}

                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => {
                                                                        signOut()
                                                                    }
                                                                    }
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    {t('sign:sign-out')}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                ) : (
                                                    <Menu.Items className="absolute  cursor-pointer right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <span
                                                                className={'block px-4 py-2 text-sm text-gray-700'}
                                                                onClick={() => setSignModal('signIn')}
                                                            >
                                                                {t('sign:signIn.title')}
                                                            </span>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <span onClick={() => setSignModal('signUp')}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                    {t('sign:signUp.title')}
                                                                </span>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item >
                                                            {({ active }) => (

                                                                <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                    <SetLanguage title={t('common:language')} active={locale} handleLanguageChange={handleLanguageChange} />
                                                                </span>
                                                            )}

                                                        </Menu.Item>
                                                        <Menu.Item >
                                                            {({ active }) => (

                                                                <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                    <SetTheme title={t('common:theme')} dark={t('common:dark')} light={t('common:light')} theme={theme} handleToggle={handleToggle} />
                                                                </span>
                                                            )}

                                                        </Menu.Item>
                                                    </Menu.Items>)
                                                }
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="absolute left-0 top-[100%] z-[19] bg-background-color shadow-lg flex rounded-b-2xl w-full md:hidden">
                                <AnimatePresence>
                                    {open && (
                                        <motion.div className="space-y-1 px-2 pt-2 w-full flex flex-col pb-3"
                                            transition={{ duration: 0.3 }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? ' text-primary-400' : ' flex w-full dark:text-white text-slate-400 hover:bg-primary-500 hover:text-white',
                                                        'block px-3 py-2 rounded-md text-base font-medium'
                                                    )}
                                                >
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="div"

                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {t(`${item.name}`)}
                                                    </Disclosure.Button>
                                                </Link>
                                            ))}

                                            <Searchbar></Searchbar>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>


            </motion.div>
        </AnimatePresence>
    )
}




function SetLanguage(props: any) {
    const changeLanguage = (lng: string) => {
        props.handleLanguageChange(lng)
    }
    return (
        <Popover className="relative">
            <Popover.Button className={'flex w-full h-full px-4 py-2 '}>{props.title}</Popover.Button>

            <Popover.Panel as="div" className="absolute z-20 top-4 flex flex-col w-full right-24 rounded-md bg-white py-2 text-sm text-gray-700 shadow-lg">
                <button className={'bg-white flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
                    + (props.active === 'en' ? 'bg-primary-200 !text-primary-500 hover:!bg-primary-200 unselectable' : '')} onClick={() => { changeLanguage('en') }}>English</button>
                <button className={'bg-white flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
                    + (props.active === 'tr' ? 'bg-primary-200 !text-primary-500 hover:!bg-primary-200 unselectable' : '')} onClick={() => { changeLanguage('tr') }}>Turkish</button>

            </Popover.Panel>
        </Popover>
    )
}

function SetTheme(props: any) {
    return (
        <div className={'flex w-full h-full px-4 py-1 items-center'} onClick={(event) => { event.preventDefault(); props.handleToggle() }}>
            <span className=''>{props.title}</span>
            <button
                type="button" onClick={(event) => { event.preventDefault(); props.handleToggle() }}
                className="rounded-full ml-auto p-1 flex  bg-primary-100  text-primary-400 hover:text-primary-500 hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
            >
                <span className="sr-only">Dark or light theme button</span>
                {props.theme == 'light' && <SunIcon className="h-5 w-5" aria-hidden="true" />}
                <span className='mx-2'>
                    {props.theme == 'light' ? props.light : props.dark}
                </span>
                {props.theme == 'dark' && <MoonIcon className="h-5 w-5" aria-hidden="true" />}

            </button>
        </div>
    )
}

export default Navbar