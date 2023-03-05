import Head from 'next/head'
import { Card, CardsWrapper } from '../components/Cards/card'
import { Carousel } from '../components/Home/carousel'
import api from '../api';
import styles from '../styles/Home.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useEffect } from 'react'

function Home(props: any) {
  const { windowWidth, windowHeight }: any = useWindowDimensions();

  useEffect(() => {
    console.log('windowWidth', windowWidth)
  }, [windowWidth])

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>eCommerce</title>
          <meta name="description" content="eCommerce website example by sowhat" />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles['inner-wrapper'] + ' my-container top-gap'}>
            <Carousel />
            <div className='flex w-full h-full flex-col gap-8'>
              {props?.products &&
                (!windowWidth || (windowWidth > 768)) ?
                <CardsWrapper cards={
                  props.products.map((product: any) => {
                    {/* @ts-ignore */ }

                    return <Card item={product} key={product.slug} />
                  }
                  )
                } title={'Highlights'} titleLink={'/products?sort=discount'} />
                : <CardsWrapper swiperCards={
                  props.products
                } sliderId={"slideHighlights"} title={'Highlights'} titleLink={'/products?sort=discount'} />
              }


              {props?.populars &&
                (!windowWidth || (windowWidth > 768)) ?
                <CardsWrapper cards={
                  props.populars.map((popular: any) => {
                    {/* @ts-ignore */ }

                    return <Card item={popular} key={popular.slug} />
                  }
                  )
                } title={'Populars'} titleLink={'/products?sort=popular'} />
                : <CardsWrapper swiperCards={
                  props.populars
                } sliderId={"slidePopulars"} title={'Populars'} titleLink={'/products?sort=popular'} />
              }
            </div>

          </div>

        </main>


      </div>
    </div>
  )
}


export async function getServerSideProps({ query, req, res, locale }: any) {
  const options: any = {};
  if (req && req.headers) options.headers = { ...req.headers }
  const productsRes = await api.request('/products', { limit: 10, sort: '-price.discountPercentage', isDiscount: true }, options);
  const products = productsRes.code === 200 ? productsRes.data : null;

  const popularRes = await api.request('/products', { limit: 10, sort: '-visits'}, options);
  const populars = popularRes.code === 200 ? popularRes.data : null;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sign', 'common'
      ])),
      products,
      populars
    }
  };
}


export default Home