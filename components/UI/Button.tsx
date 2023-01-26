

import type { NextPage } from 'next';
import React, { useState, useRef } from 'react'
import styles from './button.module.scss'
import { motion, AnimatePresence } from 'framer-motion'


interface ButtonProps {

    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    priority?: boolean;
    rest?: any;
    onClick?: any;
    style?: any;
    text?: string;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: any;
    rightIcon?: any;

}
function getRelativeCoordinates(event: any, referenceElement: any) {
    const position = {
        x: event.pageX,
        y: event.pageY
    };

    const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop,
        width: referenceElement.clientWidth,
        height: referenceElement.clientHeight
    };

    let reference = referenceElement.offsetParent;

    while (reference) {
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
    }

    return {
        x: position.x - offset.left,
        y: position.y - offset.top,
        width: offset.width,
        height: offset.height,
        centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
        centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2)
    };
}
const css = {

    fly: {
        position: "absolute",
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: 10
    }
};
const Button: NextPage<ButtonProps> = ({ text, leftIcon, rightIcon, className, loading, onClick, disabled, ...rest }) => {

    const [situation, setSituation] = useState('')
    const [isHovered, setIsHovered] = useState(false)

    const [mousePosition, setMousePosition]: any = useState({});
    const boxRef = useRef(null);
    const handleMouseMove = (e: any) => {
        setMousePosition(getRelativeCoordinates(e, boxRef.current));
    };

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
        onHovered: {

        },
        active: {
       
        },
        loading: {
        },

        inactive: {
            rotateX: mousePosition.centerX,
            rotateY: mousePosition.centerY
        },
        shadowTap: {
            boxShadow: "0 0 30px 10px rgba(255,255,255,0.4),0 0 100px 40px rgba(255,255,255,0.4)",
            transition: {
                duration: 0.1,
            }
        }
    }
    return (
        <>
            <AnimatePresence>
                <motion.button
                    animate={situation == 'active' ? "active" : situation == 'loading' ? 'loading' : "inactive"}
                    variants={variants}
                    whileHover={variants.onHovered}
                    whileTap={variants.active}
                    onClick={() => {
                        if (loading || situation == 'loading' || disabled) return;
                        onClick()
                    }}
                    className={styles.buttonWrapper + "  rounded-lg relative bg-button-gradient text-white font-medium border-r-2 border-b-2 border-gray-500/25 py-2 px-4 flex items-center justify-center "
                        + (className ? className : '') + (disabled ? ' !bg-none !shadow-none !bg-gray-300 ' : '') +
                        (situation == 'loading' || loading ? ' pointer-events-none unselectable' : '')}  {...rest}

                    ref={boxRef}
                    onMouseMove={e => handleMouseMove(e)}
                    onHoverStart={() => { setIsHovered(true) }}
                    onHoverEnd={() => { setIsHovered(false) }}
                >
                    {situation == 'loading' || loading ?
                        <motion.div
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0 }}
                            className={' absolute top-0 left-0 w-full h-full overflow-hidden flex items-center rounded-lg justify-center'}>
                            <motion.div className='shine'
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{ opacity: 0 }}
                            ></motion.div>
                        </motion.div> : null
                    }
                    {leftIcon &&
                        <span className='mx-2 '>
                            {leftIcon}
                        </span>
                    } {text}
                    {rightIcon &&
                        <span className='mx-2 '>
                            {rightIcon}
                        </span>
                    }

                    {/* on hover  */}
                    {isHovered &&
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                                className={' absolute top-0 left-0 w-full h-full overflow-hidden flex items-center rounded-lg justify-center'}
                            >

                                <motion.div
                                    style={{
                                        position: "absolute",
                                        width: "0.5px",
                                        height: "0.5px",
                                        left: 0,
                                        top: 0,
                                        borderRadius: 10,
                                        boxShadow: "0 0 80px 15px rgba(255,255,255,0.4),0 0 80px 30px rgba(255,255,255,0.4)",
                                    }}
                                    animate={{
                                        x: mousePosition.x,
                                        y: mousePosition.y
                                    }}
                                    variants={variants}
                                    exit={{ opacity: 0 }}
                                    whileTap={variants.shadowTap}
                                />
                            </motion.div>
                        </AnimatePresence>

                    }

                </motion.button>
            </AnimatePresence>
        </>
    );
}

export default Button;