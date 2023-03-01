import Head from 'next/head'
import { Card, CardsWrapper } from '../components/Cards/card'
import { Carousel } from '../components/Home/carousel'
import api from '../api';
import styles from '../styles/Home.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useWindowDimensions from '@/hooks/useWindowDimensions'

function Home(props: any) {
  const { windowWidth, windowHeight }: any = useWindowDimensions();

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
            <div className='flex w-full h-full'>

              {props?.products &&
                windowWidth > 768 ?
                <CardsWrapper cards={
                  props.products.map((product: any) => {
                    {/* @ts-ignore */ }

                    return <Card item={product} key={product.slug} />
                  }
                  )
                } title={'Highlights'} titleLink={'/products?sort=discount'} />
                : <CardsWrapper swiperCards={
                  props.products
                } title={'Highlights'} titleLink={'/products?sort=discount'} />
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
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sign', 'common'
      ])),
      products
    }
  };
}


export default Home