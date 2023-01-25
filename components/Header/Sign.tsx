import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '../UI/Input'
import { LockClosedIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import api from '../../api';
import { useDispatch } from 'react-redux'
import userSlice from '../../store/userSlice';
import { useContext } from 'react'
import { ContextWrapper } from '../../context'
import { useTranslation } from 'next-i18next'
import Button from '../UI/Button'


function Sign(props: any) {
    let [isSignModal, set_isSignModal] = useState(props.signModal || false)


    function closeModal() {
        set_isSignModal(false)
        setTimeout(() => {

            props.closeSign(false)
        }, 400);

    }
    useEffect(() => {
        if (!isSignModal) {
            closeModal()
        }
    }, [isSignModal])

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
    return (
        <>

            <AnimatePresence>
                {isSignModal && (
                    <Dialog static as={motion.div} open={(isSignModal && isSignModal.length > 0 ? true : false)} className="relative z-[500]" onClose={() => { closeModal() }}>


                        <div className="fixed inset-0 overflow-y-auto bg-black/30">
                            <div className="flex min-h-full items-center justify-center p-1 sm:p-4 text-center">
                                <Dialog.Panel as={motion.div}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="w-full max-w-md transform min-h-96 relative  overflow-hidden rounded-2xl bg-primary-50 dark:bg-primary-900 p-3 sm:p-6 text-left align-middle shadow-xl transition-all">

                                    <span onClick={() => { closeModal() }} className="absolute transition z-10 top-4 right-4 h-7 w-7 text-indigo-500
                                     dark:text-indigo-400 hover:text-indigo-300 cursor-pointer">
                                        <span className="sr-only">Close dialog</span>

                                        <motion.svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            initial="hidden"
                                            animate="visible"
                                            className="fill-current"
                                        >

                                            <motion.line
                                                x1="0"
                                                y1="0"
                                                x2="20"
                                                y2="20"
                                                variants={draw}
                                                custom={2}
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            />
                                            <motion.line
                                                x1="20"
                                                y1="0"
                                                x2="0"
                                                y2="20"
                                                variants={draw}
                                                custom={2.5}
                                                stroke="currentColor"
                                                strokeWidth={2}

                                            />

                                        </motion.svg>
                                    </span>
                                    {isSignModal === 'signIn' ? <SignIn isOpenSignIn={isSignModal} setIsOpenSignIn={(val: any) => { set_isSignModal(val) }} /> : isSignModal === 'signUp' ? <SignUp isOpenSignIn={isSignModal} setIsOpenSignIn={(val: any) => { set_isSignModal(val) }} /> : null}

                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                )}

            </AnimatePresence>
        </>
    )
}

function SignIn(props: any) {
    const { t } = useTranslation('sign')
    const { addAlert } = useContext(ContextWrapper) as any;
    const [email, set_email] = useState({ value: '', error: '' });
    const [loading, set_loading] = useState(false);
    const [password, set_password] = useState({ value: '', error: '' });;
    const dispatch = useDispatch();
    async function handleSignIn() {
        if (email.value === '') {
            set_email({ ...email, error: t('signIn.error-email-missing') })

        }
        if (password.value === '') {
            set_password({ ...password, error: t('signIn.error-password-missing') })
        }
        if (email.value !== '' && password.value !== '') {
            set_loading(true)
            const res = await api.request('/auth/signIn', undefined, {
                method: 'POST',
                body: JSON.stringify({ email: email.value, password: password.value })
            });

            if (res.code === 200) {
                dispatch(userSlice.actions.setUser(res.user));
                addAlert(t('signIn.sign-in-success'), 'success');
                set_loading(false)

                props.setIsOpenSignIn('');
            } else {
                set_password({ ...password, error: t('signIn.error-email-password') })
                set_loading(false)

            }
        }
    }

    return (
        <>
            {props.isOpenSignIn && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, scale: 0.5 }}>
                    <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium  text-primary-500 dark:text-primary-300"
                    >
                        {t('signIn.title')}
                    </Dialog.Title>
                    <form className="mt-2">
                        <Input value={email.value} label={t('signIn.email')}
                            handleChange={(value: any) => { set_email({ ...email, ...value }) }} className="mt-5" error type={'withShadow'}
                            errorText={email.error} onEnter={() => { console.log('enter') }} clearable left={<UserIcon />} placeholder={t('signIn.email-placeholder')} />
                        <Input value={password.value} label={t('signIn.password')}
                            handleChange={(value: any) => { set_password({ ...password, ...value }) }} inputType="password" className="mb-1 "
                            error errorText={password.error} type={'withShadow'} onEnter={() => { handleSignIn() }} clearable left={<LockClosedIcon />}
                            placeholder={t('signIn.password-placeholder')} />
                    </form>
                    <div className="mt-2">
                        <span
                            className="inline-flex justify-center rounded-md border border-transparent px-4
                             py-2 text-sm font-medium text-primary-900 dark:text-primary-200 dark:hover:text-primary-300 hover:text-primary-700 cursor-pointer"
                            onClick={() => { props.setIsOpenSignIn('signUp') }}
                        >
                            {t('signIn.dont-have-account')} &nbsp; <strong>{t('signIn.sign-up')}</strong>
                        </span>
                    </div>
                    <div className="mt-4">
                        <Button loading={loading} text={`${t('signIn.submit')}`} onClick={() => { handleSignIn() }} className="text-lg w-full bg-button-gradient2 d3-shadow2"></Button>


                    </div>
                </motion.div>
            )
            }

        </>
    )
}

function SignUp(props: any) {
    const { addAlert } = useContext(ContextWrapper) as any;
    const [email, set_email] = useState({ value: '', error: '' });
    const [password, set_password] = useState({ value: '', error: '' });
    const [password2, set_password2] = useState({ value: '', error: '' });
    const [loading, set_loading] = useState(false);

    const { t } = useTranslation('sign')

    const dispatch = useDispatch();
    async function handleSignUp() {
        if (email.value === '') {
            set_email({ ...email, error: t('signUp.error-email-missing') })
            return

        }
        if (password.value === '') {
            set_password({ ...password, error: t('signUp.error-password-missing') })
            return

        }
        if (password2.value === '') {
            set_password2({ ...password2, error: t('signUp.error-password-confirmation-missing') })
            return

        }
        if (password.value !== password2.value) {
            set_password2({ ...password2, error: t('signUp.error-password-confirmation-not-match') })
            return
        }

        if (email.value !== '' && password.value !== '') {
            set_loading(true)
            const res = await api.request('/auth/signUp', undefined, {
                method: 'POST',
                body: JSON.stringify({ email: email.value, password: password.value })
            });
            if (res.code === 200) {
                dispatch(userSlice.actions.setUser(res.user));
                addAlert(t('signUp.sign-up-success'), 'success');
                set_loading(false)

                props.setIsOpenSignIn('');
            } else if (res.code === 409) {
                set_loading(false)

                set_email({ ...email, error: t('signUp.error-email-already-exists') })
            } else {
                set_loading(false)

                set_password2({ ...password, error: t('signUp.something-wrong') })

            }
        }
    }

    return (
        <>
            {props.isOpenSignIn && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, scale: 0.5 }}>
                    <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium  text-primary-500 dark:text-primary-300"
                    >
                        {t('signUp.title')}
                    </Dialog.Title>
                    <form className="mt-2">
                        <Input value={email.value} label={t('signUp.email')}
                            handleChange={(value: any) => { set_email({ ...email, ...value }) }} className="mt-5" error
                            type={'withShadow'} errorText={email.error} onEnter={() => { console.log('enter') }} clearable left={<UserIcon />} placeholder={t('signUp.email-placeholder')} />
                        <Input value={password.value} label={t('signUp.password')}
                            handleChange={(value: any) => { set_password({ ...password, ...value }) }} inputType="password" error errorText={password.error}
                            type={'withShadow'} onEnter={() => { console.log('enter') }} clearable left={<LockClosedIcon />} placeholder={t('signUp.password-placeholder')} />
                        <Input value={password2.value} label={t('signUp.password-confirmation')}
                            handleChange={(value: any) => { set_password2({ ...password2, ...value }) }} inputType="password" className="mb-1 " error errorText={password2.error}
                            type={'withShadow'} onEnter={() => { console.log('enter') }} clearable left={<LockClosedIcon />} placeholder={t('signUp.password-confirmation-placeholder')} />

                        <p className="text-sm text-gray-500">
                            Your payment has been successfully submitted. We’ve sent
                            you an email with all of the details of your order.
                        </p>
                    </form>
                    <div className="mt-2">
                        <span
                            className="inline-flex justify-center rounded-md border border-transparent px-4
                             py-2 text-sm font-medium text-primary-900 dark:text-primary-200 dark:hover:text-primary-300 hover:text-primary-700 cursor-pointer"
                            onClick={() => { props.setIsOpenSignIn('signIn') }}
                        >
                            {t('signUp.already-have-account')} &nbsp; <strong>{t('signUp.sign-in')}</strong>
                        </span>
                    </div>
                    <div className="mt-4">


                        <Button loading={loading} text={`${t('signUp.submit')}`} onClick={() => { handleSignUp() }} className="text-lg w-full bg-button-gradient2 d3-shadow2"></Button>

                    </div>
                </motion.div>
            )
            }

        </>
    )
}

export {
    SignIn, SignUp, Sign
}