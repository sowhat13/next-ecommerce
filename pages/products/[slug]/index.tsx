import api from '../../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'



function Product(props: any) {
  const router = useRouter()
  const slug = router.query.slug as string
  return (

    <div>
      <Head>
        <title>{props.product.title || 'Best products for you'} - eCommerce</title>
        <meta name="description" content={props.product.description || 'Special products by eCommerce'} />
        <meta name="keyword" content={`${props.product.collectionName.name ? props.product.collectionName.name + ',' : ''} ${props.product.categories.map((cat: any) => { return cat.name }).join(', ')}`} />

      </Head>
      {props.product.title}  {slug}
    </div>
  )
}


export async function getServerSideProps({ query, req, res, locale }: any) {
  const options: any = {};
  // if (req && req.headers) options.headers = { ...req.headers }
  const productRes = await api.request('/products', { slug: query.slug }, options);
  const product = productRes.code === 200 ? productRes.data : null;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sign', 'common'
      ])),
      product
    }
  };
}

// export async function getStaticProps({ locale, params }: any) {
//     const options: any = {};
//     // if (req && req.headers) options.headers = { ...req.headers }
//     const productRes = await api.request('/products', { slug: params.slug }, options);
//     const product = productRes.code === 200 ? productRes.data : null;
//     console.log(product, 'product')
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, [
//                 'sign', 'common'
//             ])),
//             product

//         },
//     }
// }


export default Product