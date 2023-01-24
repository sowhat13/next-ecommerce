import api from '../../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCoins, faStar } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ImagesWrapper from '../../../components/Products/ImagesWrapper';
import styles from '../../../components/Cards/cards.module.scss'



function Product(props: any) {
  const router = useRouter()
  const slug = router.query.slug as string
  return (

    <div>
      <Head>
        <title>{props.product.title ? props.product.title + ' - eCommerce' : 'Best products for you - eCommerce'}</title>
        <meta name="description" content={props.product.description || 'Special products by eCommerce'} />
        <meta name="keyword" content={`${props.product.collectionName.name ? props.product.collectionName.name + ',' : ''} ${props.product.categories.map((cat: any) => { return cat.name }).join(', ')}`} />

      </Head>

      <div className='my-container top-gap'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8 items-center md:items-start'>
          <div className='w-full md:w-fit'>
            <div className='w-full h-[300px] max-w-[96%] mx-auto md:w-[400px] md:h-[540px] flex items-center justify-center rounded-2xl overflow-hidden bg-primary-gradient-light d3-shadow4'>
              <ImagesWrapper images={props.product.images}></ImagesWrapper>
            </div>
          </div>
          <div className={'w-[96%] md:w-1/2 p-4  flex-col md:flex-row flex gap-4  bg-primary-gradient2 rounded-2xl h-fit d3-shadow4' + (!props?.product?.title ? ' shiny-element' : '')}>
            <div className="flex flex-col w-full">
              <div className='flex flex-col font-medium text-2xl '>

                {props.product.title}
              </div>
              <div className='flex flex-col text-md text-primary-500'>
                {props.product.collectionName.name}
              </div>
              <div className='flex flex-col mt-2'>
                <div className='flex flex-col text-md color-gray-color3'>
                  {props.product.description}
                </div>

              </div>
            </div>
            <div className='flex md:w-auto w-full min-w-fit mx-auto gap-4 items-center flex-col md:mt-4 whitespace-nowrap'>
              <button className={styles.cardPriceButton + ' relative !flex !flex-row w-full md:w-auto !p-0 !min-w-[160px]'}>
                <div className='absolute -top-1 -left-2 bg-yellow-300 d3-shadow2 w-8 h-8 rounded-full flex items-center justify-center'>
                  <FontAwesomeIcon className='w-4 h-4 text-yellow-600 ' icon={faStar} />
                </div>
                <div className="flex flex-col w-full">
                  <span className='mb-1 font-semibold italic text-xs flex w-full rounded-t-2xl items-center justify-center p-1 bg-button-gradient3 d3-shadow'>Rating </span>
                  <div className="flex flex-col justify-center items-center pt-1 pb-3">

                    <span className={styles.cardPriceButtonText}>
                      {props.product.rating}
                    </span>
                  </div>
                </div>

              </button>
              <button className={styles.cardPriceButton + ' relative !flex !flex-row w-full md:w-auto !p-0 !min-w-[160px]'}>
                <div className='absolute -top-1 -left-2 bg-green-300 d3-shadow2 w-8 h-8 rounded-full flex items-center justify-center'>
                  <FontAwesomeIcon className='w-4 h-4 text-green-600' icon={faCoins} />
                </div>
                <div className="flex flex-col w-full">
                  <span className='mb-1 font-semibold italic text-xs flex w-full rounded-t-2xl items-center justify-center p-1 bg-button-gradient3 d3-shadow '>Price </span>

                  <div className="flex flex-col justify-center items-center pt-1 pb-3">
                    {(() => {
                      if (props.product.price?.isDiscount) {
                        return (<span className={styles.cardPriceButtonDiscountText}>
                          <FontAwesomeIcon icon={faAngleDown} />
                          <span className='sr-only'>Old Price: </span>
                          {props.product.price?.oldPrice?.toFixed(2)} $
                        </span>)
                      }
                    })()}
                    <span className={styles.cardPriceButtonText}>
                      <span className='sr-only'>Price: </span>

                      {props.product.price?.price?.toFixed(2)} $
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
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



export default Product