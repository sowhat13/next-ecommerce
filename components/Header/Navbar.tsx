
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, SunIcon, MoonIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import themeSlice from '../../store/themeSlice';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Sign } from './Sign'
import GImage from '../Global/GImage'
import { useTranslation } from 'next-i18next'




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

    const { t, i18n } = useTranslation(['sign', 'common'])
    const dispatch = useDispatch();
    const router = useRouter()
    const navigations = [
        { name: 'sign:signIn:title', href: '/', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Projects', href: '#', current: false },
        { name: 'Calendar', href: '#', current: false },
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


    return (
        <div className='flex w-full'>
            {signModal && <Sign signModal={signModal} closeSign={(val: any) => { setSignModal(val) }}></Sign>}

            <Disclosure as="nav" className="bg-gray-100 bg-opacity-5 flex w-full">
                {({ open }) => (
                    <>
                        <div className="flex w-full px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 w-full items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 min-w-fit items-center justify-center sm:items-stretch sm:justify-start">
                                    <button onClick={() => { router.push('/') }} className="flex flex-shrink-0 items-center cursor-pointer">

                                        <GImage
                                            src="http://app.sunvalley.vip/img/moen-n-logo-w.be05be5f.png"
                                            alt="Your Company"
                                            width={60}
                                            height={60}
                                            quality={100}
                                            priority={true}
                                            className=" h-16 w-auto block"
                                        />
                                    </button>
                                </div>
                                <SearchBar></SearchBar>
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
                                        className="rounded-full bg-primary-50 dark:bg-opacity-10 ml-3  p-1 text-primary-400 hover:text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            {user && Object.keys(user).length > 0 ? (
                                                <Menu.Button className="flex rounded-full h-10 w-10  text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400">
                                                    <span className="sr-only">Open user menu</span>
                                                    {user.avatar && user.avatar.url ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={user.avatar.url}
                                                            alt=""
                                                        />
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
                                                    <Menu.Item>
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
                                                    </Menu.Item>
                                                    <Menu.Item >
                                                        {({ active }) => (

                                                            <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                <SetLanguage title={t('Language')} active={locale} handleLanguageChange={handleLanguageChange} />
                                                            </span>
                                                        )}

                                                    </Menu.Item>
                                                    <Menu.Item >
                                                        {({ active }) => (

                                                            <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                <SetTheme title={t('Theme')} active={theme} handleToggle={handleToggle} />
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
                                                                Sign out
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
                                                                <SetLanguage title={t('Language')} active={locale} handleLanguageChange={handleLanguageChange} />
                                                            </span>
                                                        )}

                                                    </Menu.Item>
                                                    <Menu.Item >
                                                        {({ active }) => (

                                                            <span className={classNames(active ? 'bg-gray-100' : '', 'block text-sm text-gray-700')}>
                                                                <SetTheme title={t('Theme')} active={theme} handleToggle={handleToggle} />
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

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? ' text-white' : 'text-primary-400 hover:bg-primary-500 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>


        </div>
    )
}


function SearchBar(props: any) {
    return (
        <div className='flex w-full justify-center items-center '>
            <div className="flex w-fit max-w-[500px]  lg:w-full h-9 rounded-2xl px-4  items-center bg-primary-100">
                <input className='bg-transparent outline-none hidden md:flex flex-auto' placeholder='Search...' />
                <MagnifyingGlassIcon className='h-8 rounded-full w-8 cursor-pointer text-primary-600 hover:bg-primary-200 p-1'></MagnifyingGlassIcon>
            </div>
        </div>
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
        <button
            type="button" onClick={props.handleToggle}
            className="rounded-full  bg-primary-50 p-1 dark:bg-opacity-10 text-primary-400 hover:text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-400"
        >
            <span className="sr-only">Dark or light theme button</span>
            {props.theme == 'light' ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />}
        </button>
    )
}

export default Navbar