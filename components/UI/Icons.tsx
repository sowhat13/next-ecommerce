import { motion } from 'framer-motion'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

function Icons(props: any) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: any) => {
            const delay = 0.4 + i * 0.1;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    const [size, setSize] = useState(props.size ? props.size : 24);
    const [duration, setDuration] = useState(props.duration ? props.duration : 0.3);
    const [repeat, setRepeat] = useState(props.repeat ? props.repeat : '');
    const [repeatDelay, setRepeatDelay] = useState(props.repeatDelay ? props.repeatDelay : '');

    return (
        <>
            {
                props.icon == 'success' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                    <motion.path strokeLinecap="round" strokeLinejoin="round"
                        stroke="currentColor"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                    : props.icon == "check" ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill='currentColor' className={'w-6 h-6 ' + props.className}>
                            <motion.path fillRule="evenodd"
                                stroke="currentColor"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>



                        : props.icon == 'error' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                <motion.path strokeLinecap="round" strokeLinejoin="round"
                                    stroke="currentColor"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            : props.icon == 'warning' ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                    <motion.path stroke-linecap="round" stroke-linejoin="round"
                                        stroke="currentColor"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                : props.icon == 'info' ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                        <motion.path strokeLinecap="round" strokeLinejoin="round"
                                            stroke="currentColor"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    : props.icon == 'xmark' ?
                                        <motion.svg
                                            width={size}
                                            height={size}
                                            viewBox={`0 0 ${size} ${size}`}
                                            initial="hidden"
                                            animate="visible"
                                            className={'fill-current ' + props.className}
                                        >

                                            <motion.line
                                                x1="0"
                                                y1="0"
                                                x2={size}
                                                y2={size}
                                                variants={draw}
                                                custom={2}
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            />
                                            <motion.line
                                                x1={size}
                                                y1="0"
                                                x2="0"
                                                y2={size}
                                                variants={draw}
                                                custom={2.5}
                                                stroke="currentColor"
                                                strokeWidth={2}

                                            />

                                        </motion.svg>
                                        : props.icon == 'gift' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                                <motion.path strokeLinecap="round" strokeLinejoin="round"
                                                    stroke="currentColor"
                                                    initial={{ pathLength: 0, }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            : props.icon == 'arrowRight' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + `${props.className}`}>
                                                    <motion.path strokeLinecap="round" strokeLinejoin="round"
                                                        stroke="currentColor"
                                                        initial={{ pathLength: 0, }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>


                                                : props.icon == 'search' ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                                        <motion.path strokeLinecap="round" strokeLinejoin="round"
                                                            stroke="currentColor"
                                                            initial={{ pathLength: 0 }}
                                                            animate={{ pathLength: 1 }}
                                                            transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                    </svg>


                                                    : props.icon == 'cart' ?
                                                        <FontAwesomeIcon className={'w-6 h-6 ' + props.className} icon={faCartShopping} />
                                                        : props.icon == 'minus' ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                                                <motion.path strokeLinecap="round" strokeLinejoin="round" 
                                                                   stroke="currentColor"
                                                                   initial={{ pathLength: 0 }}
                                                                   animate={{ pathLength: 1 }}
                                                                   transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                                d="M19.5 12h-15" />
                                                            </svg>

                                                            : props.icon == 'plus' ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"

                                                                    strokeWidth={1.5} stroke="currentColor" className={'w-6 h-6 ' + props.className}>
                                                                    <motion.path strokeLinecap="round"
                                                                        stroke="currentColor"
                                                                        initial={{ pathLength: 0 }}
                                                                        animate={{ pathLength: 1 }}
                                                                        transition={{ repeat, repeatDelay, duration, yoyo: Infinity, ease: "easeInOut", delay: 0.3 }}
                                                                        strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>


                                                                : null
            }
        </>
    )
}


export default Icons