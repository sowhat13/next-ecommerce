import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import sts from './alert.module.scss'
import { useState, useEffect, useRef } from 'react'
import Icons from './Icons'

function Alert(props: any) {

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
    const alerts = props.alerts
    const setAlerts = props.setAlerts

    const addAlert = (text: string, type?: string, time?: number) => {
        const typ = type || 'success';
        const tim = time || 3000;
        const newAlertRef = { text, id: Date.now() + tim, typ };
        setAlerts([...alerts, newAlertRef]);
    };
    const deleteAlert = (id: any) => {
        setAlerts(alerts.filter((alert: any) => { return alert.text !== '' }));
    };
    useEffect(() => {
        let timeoutId: any = null
        if (alerts.length) {

            timeoutId = setInterval(() => {
                alerts.forEach((alert: any, index: any) => {
                    if (alert.id < Date.now()) {
                        if (!alert.text) {
                            return deleteAlert(alert.id)
                        }


                        let newArray = alerts.map((item: any) => {
                            if (item.id === alert.id) {
                                item.text = ""
                            }
                            return item;
                        });
                        return setAlerts(newArray)



                    }
                })
            }, 1000);
        }

        return () => {
            clearInterval(timeoutId);
        }
    }, [alerts]);

    return (
        <>
            <div className={`${sts.alertWrapper} ${props.right ? sts.right : props.middle ? sts.middle : sts.left} ${props.bottom ? sts.bottom : sts.top}`}>
                {alerts.map((alert: any, index: any) => {
                    return (
                        <AlertItem alert={alert} key={alert.id} deleteItem={deleteAlert}></AlertItem>
                    )
                }
                )}


            </div>


        </>
    )
}


function AlertItem(props: any) {

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
    const [isAlert, setIsAlert]: any = useState(true)

    const deleteIt = () => {
        setIsAlert(false)
        setTimeout(() => {
            props.deleteItem(props.alert.id)
        }, 500);
    }

    return (
        <>


            <AnimatePresence>
                {props.alert && props.alert.text && isAlert && (

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}

                        className={" px-4 pr-9 py-4 flex rounded-lg relative border "
                            + (props.alert.type == 'error' ? sts.error : props.alert.type == 'warning' ?
                                sts.warning : props.alert.type == 'info' ? sts.info : sts.success) + ` ${sts.alert}`} role="alert">


                        <span className="flex flex-row">
                            <div className='mr-2 w-fit h-fit'>
                                <Icons icon={props.alert.type} />
                            </div>
                            {props.alert.text}
                        </span>
                        <span onClick={() => { deleteIt() }} className="absolute transition z-10 top-4 right-3 h-4 w-4 closeBtn
                                       hover:opacity-50 cursor-pointer">
                            <span className="sr-only">Close alert</span>

                            <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                initial="hidden"
                                animate="visible"
                                className="fill-current"
                            >

                                <motion.line
                                    x1="0"
                                    y1="0"
                                    x2="12"
                                    y2="12"
                                    variants={draw}
                                    custom={2}
                                    stroke="currentColor"
                                    strokeWidth={2}
                                />
                                <motion.line
                                    x1="12"
                                    y1="0"
                                    x2="0"
                                    y2="12"
                                    variants={draw}
                                    custom={2.5}
                                    stroke="currentColor"
                                    strokeWidth={2}

                                />

                            </motion.svg>
                        </span>
                    </motion.div>


                )
                }
            </AnimatePresence>


        </>
    )


}

export {
    Alert
}