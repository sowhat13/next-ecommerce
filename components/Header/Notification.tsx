import Icons from '../UI/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import {useState, useEffect} from 'react'


function Notification() {

    const [delayDone, setDelayDone] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayDone(true)
        }, 2000)
        return () => clearTimeout(timer)
    })
    return (
        <AnimatePresence>
            {delayDone &&
                <motion.div
                    initial={{ opacity: 0, scaleY: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                    animate={{ opacity: 1, scaleY: 1, height: 'auto', paddingTop: '8px', paddingBottom: '8px' }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, height: 0 }}
                    className='flex w-full bg-violet-100 bg-primary-gradient-soft min-h-10 items-center justify-center'>
                    <div className='text-primary-700 dark:text-primary-100  max-w-[70%] flex items-center justify-center cursor-pointer'>
                        <span className='mr-2'>
                            <Icons icon='gift' duration={1} repeat="Infinity" repeatDelay={3} />
                        </span>

                        <span >
                            We have special discounts for you! <span className='underline font-medium'>Check details now.</span>
                        </span>
                    </div>
                    <span className='text-primary-500 dark:text-primary-200 absolute right-4 cursor-pointer'>
                        <Icons icon='xmark' size="14" />
                    </span>
                </motion.div>
            }
        </AnimatePresence>
    )
}


export default Notification