import React, { useState } from 'react'
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import styles from './input.module.scss'
import { motion, AnimatePresence } from 'framer-motion'


function Input(props: any) {

    const [propType, setPropType] = useState(props.inputType || 'text');
    const errorText = props.errorText;
    const [isFocused, setIsFocused] = useState(props.isFocused || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event?.target.value ? event.target.value : '';
        props.handleChange({ value, error: '' });


    };
    const handleChangeSet = (value: string) => {
        props.handleChange({ value: value });


    };
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onEnter(event)
        }
    };
    return (
        <div className={(props.className ? props.className : '')}>
            {props.label ? <label htmlFor={props.label.split(' ').join('-')} className={'flex w-full py-1 mt-1 text-sm font-medium  text-primary-400 px-4 ' + ` ${errorText ? 'text-red-400 dark:text-red-400' : ''} `}>{props.label}</label> : ''}
            <div style={props.style}
                className={"flex transition w-full  h-11 rounded-xl px-2 sm:px-3  items-center dark:bg-primary-600 dark:border-primary-700 bg-primary-50 border-2 border-primary-100 bg-primary-gradient-light " 
                + `${props.wrapperClass ? props.wrapperClass : ''}` + ` ${isFocused ? 'border-primary-200 dark:border-primary-800' : ''} 
                ${props.disabled ? 'grayscale unselectable pointer-events-none' : ''} ${props.type == 'withShadow' ? 'd3-shadow3' : ''}` + ` ${errorText ? ' !border-red-400  ' : ''} ` }>
                {
                    props.left ? <div className={'flex items-center transition justify-center  h-6 min-w-[24px] mr-1 sm:mr-3 text-primary-300 dark:text-primary-200 ' 
                    + ` ${isFocused ? 'text-primary-500' : ''}`  + ` ${errorText ? ' [&>*]:!text-red-400  ' : ''} ` }>
                        {props.left}
                    </div> : ''
                }

                <input disabled={props.disabled || false} onKeyPress={props.onEnter ? handleKeyPress : () => { return }} onBlur={() => { setIsFocused(false) }} 
                onFocus={() => { setIsFocused(true) }} id={props.label ? props.label.split(' ').join('-') : ''} 
                type={propType} value={props.value} onChange={handleChange} 
                className={'bg-transparent outline-none flex w-full h-full text-gray-600 dark:text-gray-300 transition ' + ` ${errorText ? ' !text-red-400  ' : ''} ` 
                + (props.inputClass ? props.inputClass : '')} placeholder={props.placeholder} />
                <div className={"flex gap-1" + ` ${errorText ? ' [&>*]:!text-red-400  ' : ''} ` }>

                    {
                        props.clearable && props.value.length > 0 ? <div onClick={() => { handleChangeSet('') }} className={'flex items-center cursor-pointer transition justify-center dark:text-primary-200 hover:text-primary-600  hover:dark:text-primary-300  h-6 w-6  text-primary-400' + ` ${isFocused ? 'text-primary-500' : ''}`}>
                            <XMarkIcon />
                        </div> : ''
                    }
                    {
                        props.inputType === 'password' ? <div onClick={() => { setPropType(`${propType === 'text' ? 'password' : 'text'}`) }} className={'flex items-center cursor-pointer transition justify-center dark:text-primary-200 hover:text-primary-600  hover:dark:text-primary-300  h-6 w-6  text-primary-400' + ` ${isFocused ? 'text-primary-500' : ''}`}>
                            {propType === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
                        </div> : ''
                    }
                    {
                        props.right ? <div className={'flex items-center transition justify-center  h-6 min-w-[24px]  text-primary-400 dark:text-primary-200 hover:text-primary-600  hover:dark:text-primary-300' + ` ${isFocused ? 'text-primary-500' : ''}`}>
                            {props.right}
                        </div> : ''
                    }


                </div>
            </div>
            {props.error && <div className='flex w-full min-h-[16px] h-[16px] px-4 mb-1'>
                <AnimatePresence>
                    {errorText && <motion.span className='text-red-500 text-sm' initial={{ opacity: 0, scale: 0.5 }}
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