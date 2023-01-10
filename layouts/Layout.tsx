import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import {  getCookie } from 'cookies-next';
import styles from './layouts.module.scss'
export async function getServerSideProps () {
    const theme =  getCookie('theme')
  console.log('@@@@@@@ cookies', theme)
    return {
      props: { theme },
    };
  }
  

function Layout({ children,theme }: any) {
    //@ts-ignore
    const thselect =  useSelector((state: RootState) => state.theme.theme);
    const th = theme || thselect
    return (
        <div className={styles.layoutContainer } >
            <Header />
            <main className={'main-layout'}>
                {children}
            </main>
            <Footer />
        </div>
    )
}




export default Layout
