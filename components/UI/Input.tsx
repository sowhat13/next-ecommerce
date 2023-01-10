import React, { useState } from 'react'
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import styles from './input.module.scss'
import { motion, AnimatePresence } from 'framer-motion'


function Input(props: any) {

    const [propType, setPropType] = useState(props.inputType || 'text');
    const [errorText, setErrorText] = useState(props.errorText || '');
    const [isFocued, setIsFocused] = useState(props.isFocued || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleChange(event.target.value);

    };
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onEnter(event)
            setErrorText(errorText)
        }
    };
    return (
        <div className={props.className ? props.className : ''}>
            {props.label ? <label htmlFor={props.label.split(' ').join('-')} className={'flex w-full py-1 text-sm font-medium  text-primary-400 px-4 '}>{props.label}</label> : ''}
            <div style={props.style}
                className={"flex transition d3-shadow  w-full  h-11 rounded-xl px-3  items-center dark:bg-primary-600 dark:border-primary-700 bg-primary-50 border-2 border-primary-100 " + `${props.wrapperClass ? props.wrapperClass : ''}` + ` ${isFocued ? 'border-primary-200 dark:border-primary-800' : ''} ${props.disabled ? 'grayscale unselectable pointer-events-none' : ''} ${props.type == 'withShadow' ? styles.withShadow : ''}`}>
                {
                    props.left ? <div className={'flex items-center transition justify-center  h-6 min-w-[24px] mr-3 text-primary-300' + ` ${isFocued ? 'text-primary-500' : ''}`}>
                        {props.left}
                    </div> : ''
                }

                <input disabled={props.disabled || false} onKeyPress={props.onEnter ? handleKeyPress : () => { return }} onBlur={() => { setIsFocused(false) }} onFocus={() => { setIsFocused(true) }} id={props.label ? props.label.split(' ').join('-') : ''} type={propType} value={props.value} onChange={handleChange} className={'bg-transparent outline-none flex w-full h-full ' + props.inputClass} placeholder={props.placeholder} />
                <div className="flex gap-1">

                    {
                        props.clearable && props.value.length > 0 ? <div onClick={() => { props.handleChange('') }} className={'flex items-center cursor-pointer transition justify-center hover:text-primary-600  h-6 w-6  text-primary-300' + ` ${isFocued ? 'text-primary-500' : ''}`}>
                            <XMarkIcon />
                        </div> : ''
                    }
                    {
                        props.inputType === 'password' ? <div onClick={() => { setPropType(`${propType === 'text' ? 'password' : 'text'}`) }} className={'flex items-center cursor-pointer transition justify-center hover:text-primary-600  h-6 w-6  text-primary-300' + ` ${isFocued ? 'text-primary-500' : ''}`}>
                            {propType === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
                        </div> : ''
                    }
                    {
                        props.right ? <div className={'flex items-center transition justify-center  h-6 min-w-[24px]  text-primary-300' + ` ${isFocued ? 'text-primary-500' : ''}`}>
                            {props.right}
                        </div> : ''
                    }


                </div>
            </div>
            {props.error && <div className='flex w-full h-4 px-4'>
                <AnimatePresence>
                    {errorText && <motion.span className='text-red-400 text-sm' initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0 }}>
                        {errorText}
                    </motion.span>}
                </AnimatePresence>
            </div>

            }

        </div>
    )
}




export {
    Input
}