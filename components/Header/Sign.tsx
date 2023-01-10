import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '../UI/Input'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'

function SignIn(props: any) {

    function closeModal() {
        props.setIsOpenSignIn(false)
    }
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');


    return (
        <>

            <AnimatePresence>
                {props.isOpenSignIn && (
                    <Dialog static as={motion.div} open={props.isOpenSignIn} className="relative z-[500]" onClose={() => { closeModal() }}>


                        <div className="fixed inset-0 overflow-y-auto bg-black/30">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">

                                <Dialog.Panel as={motion.div}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="w-full max-w-md transform h-96 max-h-[99vh] overflow-hidden rounded-2xl bg-primary-50 dark:bg-primary-900 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-medium  text-primary-500 dark:text-primary-300"
                                    >
                                        Sign In
                                    </Dialog.Title>
                                    <form className="mt-2">
                                        <Input value={email} label="Email"
                                            handleChange={(value: string) => { set_email(value) }} className="mt-5" error type={'withShadow'} onEnter={() => { console.log('enter') }} clearable left={<UserIcon />} placeholder='Enter your email...' />
                                        <Input value={password} label="Password"
                                            handleChange={(value: string) => { set_password(value) }} inputType="password" className="mb-1 " error type={'withShadow'} onEnter={() => { console.log('enter') }} clearable left={<LockClosedIcon />} placeholder='Enter your password...' />

                                        <p className="text-sm text-gray-500">
                                            Your payment has been successfully submitted. We’ve sent
                                            you an email with all of the details of your order.
                                        </p>
                                    </form>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => { closeModal() }}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                )}

            </AnimatePresence>

        </>
    )
}

function SignUp() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        null
    )
}

export {
    SignIn, SignUp
}