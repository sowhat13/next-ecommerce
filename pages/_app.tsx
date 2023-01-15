import '../styles/globals.scss'
import Layout from '../layouts/Layout'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../store'
import { ContextWrapper } from '../context';
import { useCallback, useState } from 'react'
import { appWithTranslation } from 'next-i18next'
function App({ Component, pageProps }: AppProps) {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((text: string, type?: string, time?: number) => {

    const typ = type || 'success';
    const tim = time || 3000;
    const newAlertRef: any = { text, id: Date.now() + tim, type:typ };
    {/* @ts-ignore */ } 
    setAlerts([...alerts, newAlertRef]);
  }, [alerts]);

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <ContextWrapper.Provider value={{ alerts: alerts, addAlert: addAlert, setAlerts:setAlerts }}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </ContextWrapper.Provider>

    </Provider >
  )
}



export default appWithTranslation(App)