
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import styles from './layouts.module.scss'
import api from '../api';
import { useDispatch } from 'react-redux'
import userSlice from '../store/userSlice';
import { getCartItems } from '../store/cartSlice';

import { useEffect, useContext } from 'react'
import { Alert } from '../components/UI/Alert'
import { ContextWrapper } from '../context'
function Layout({ children }: any) {
    const context = useContext(ContextWrapper) as any;
    const isDevelopmentClass = process.env.NODE_ENV === 'development' ? '' : 'overflow-x-hidden';

    const dispatch = useDispatch();

    useEffect(() => {
        getUser().then((user: any) => {
            console.log(user, '2sssssss')
            if (user.code === 200) {
                dispatch(userSlice.actions.setUser({ ...user.data }));
            }

        })

    }, []);

    const getUser = async () => {
        const userRes = await api.request('/user/profile');
        return userRes;
    }

    const signOut = async () => {
        const signOutRes = await api.request('/auth/signOut', undefined, { method: 'POST' });
        if (signOutRes.code === 1) {
            dispatch(userSlice.actions.setUser({}));
            context.addAlert('Signed out successfully')
        }
    }

    return (
        <div className={styles.layoutContainer + ` ${isDevelopmentClass}`} >
            <Alert alerts={context.alerts} setAlerts={context.setAlerts} ></Alert>
            <Header signOut={signOut} />
            <main className={'main-layout'}>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}



export default Layout
