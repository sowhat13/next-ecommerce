import Head from 'next/head'
import { Card, CardsWrapper } from '../components/Cards/card'
import { Carousel } from '../components/Home/carousel'

import styles from '../styles/Home.module.scss'




export default function Home() {
  return (
    <div>
        <div className={styles.container}>
          <Head>
            <title>E-Commerce</title>
            <meta name="description" content="E-Commerce website example by sowhat" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <div className={styles['inner-wrapper'] + ' my-container mt-6'}>
              <Carousel />
              <CardsWrapper cards={
                [...Array(10)].map((x, i) => {
                  {/* @ts-ignore */ }

                  return <Card key={i} />
                }
                )
              } title={'Highlights'} />
            </div>

          </main>

 
        </div>
    </div>
  )
}
