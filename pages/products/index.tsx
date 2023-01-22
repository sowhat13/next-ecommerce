import api from '../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

import { Card, CardsWrapper } from '../../components/Cards/card'
import Link from 'next/link'


function Products(props: any) {
  const { t } = useTranslation(['sign', 'common'])


  return (
    <div >
      <Head>
        <title>{props.totalProducts ? `${props.totalProducts} ${t('common:products:products-found')} - eCommerce` : 'eCommerce - Best products for you'  }</title>
        <meta name="description" content={'Special products by eCommerce'} />

      </Head>
      <div className='my-container my-10'>
        <div className='flex w-full py-2 px-4'>
          <span className='font-medium rounded-full ml-auto bg-slate-300 py-2 px-4 text-white'>
            {t(`common:products:total-products`)}: {props.totalProducts}
          </span>
        </div>
        {props?.products && props.products.length > 0 ?
          <CardsWrapper cards={
            props.products.map((product: any) => {
              {/* @ts-ignore */ }

              return <Card item={product} key={product.slug} />
            }
            )
          } /> : <div className='flex flex-col mx-auto items-center justify-center text-center gap-5'>
            <h1 className='font-semibold gradient-text bg-button-gradient2  text-center text-xl sm:text-2xl md:text-2xl flex items-center'>{t('common:products:no-products')}</h1>

            <Link href={`/products`} className=' text-center flex items-center justify-center text-base px-4 py-1 bg-button-gradient3 transition hover:opacity-80 text-white font-medium h-fit my-auto rounded-full'>{t('common:products:all-products')}</Link>
            {props?.discountedProducts && props.discountedProducts.length > 0 &&
              <CardsWrapper cards={
                props.discountedProducts.map((product: any) => {
                  {/* @ts-ignore */ }

                  return <Card item={product} key={product.slug} />
                }
                )
              } title={t(`common:products:check-discount`)} />

            }
          </div>
        }
      </div>
    </div>
  )
}


export async function getServerSideProps({ query, req, res, locale }: any) {
  const options: any = {};
  const qry: any = {}
  if (query.search) { qry.term = query.search }
  if (query.sort == 'discount') { qry.sort = '-price.discountPercentage' }

  qry.limit = 20
  let discountedProducts: any = null;
  const productsRes = await api.request('/products', qry, options);
  const products = productsRes.code === 200 ? productsRes.data : null;
  if (!products || products.length === 0) {
    const discountProducts = await api.request('/products', { sort: '-price.discountPercentage', limit: 5 }, options);
    discountedProducts = discountProducts.code === 200 ? discountProducts.data : null;
  }

  const totalProducts = productsRes.code === 200 ? productsRes.totalCount : 0


  const props: any = {
    ...(await serverSideTranslations(locale, [
      'sign', 'common'
    ])),
    products,
    totalProducts
  }

  if (discountedProducts && discountedProducts.length > 0) {
    props.discountedProducts = discountedProducts
  }

  return {
    props
  };
}

export default Products