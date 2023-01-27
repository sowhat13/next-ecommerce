import api from '../../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCoins, faStar, faTag, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ImagesWrapper from '../../../components/Products/ImagesWrapper';
import styles from '../../../components/Cards/cards.module.scss'
import Button from '../../../components/UI/Button';
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, addCartItems } from "../../../store/cartSlice";


function Product(props: any) {
  const router = useRouter()
  const slug = router.query.slug as string
  const { t } = useTranslation(['common'])
  const [loadingAddToCart, setLoadingAddToCart] = useState(false)
  const [addCartText, setAddCartText] = useState('')
  const [successAddToCart, setSuccessAddToCart] = useState(false)
  const dispatch = useDispatch();
  const addToCart = async () => {
    const data: any = {
      productId: props.product._id,
    };
    setLoadingAddToCart(true)
    //@ts-ignore
    await dispatch(addCartItems(data)).then((res: any) => {
      setAddCartText(`${t('common:products:added-to-cart')}`)
      setSuccessAddToCart(true)
      setLoadingAddToCart(false)
      setTimeout(() => {
        setAddCartText('')
        setSuccessAddToCart(false)
      }, 3000)
    }
    )

  }

  return (

    <div>
      <Head>
        <title>{props?.product?.title ? props.product.title + ' - eCommerce' : 'Best products for you - eCommerce'}</title>
        <meta name="description" content={props?.product?.description || 'Special products by eCommerce'} />
        <meta name="keyword" content={`${props?.product?.collectionName?.name ? props.product.collectionName.name + ',' : ''} 
        ${props?.product?.categories?.length > 0 && props.product.categories.map((cat: any) => { return cat.name }).join(', ')}`} />

      </Head>

      <div className='my-container top-gap'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-8 items-center md:items-start'>
          <div className='w-full md:w-fit'>
            <div className='w-full h-[300px] max-w-[96%] mx-auto md:w-[400px] md:h-[540px] flex items-center justify-center rounded-2xl overflow-hidden bg-primary-gradient-light d3-shadow4'>
              <ImagesWrapper clickToExpand={t('common:products:click-to-expand-image')} images={props.product.images}></ImagesWrapper>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:w-1/2 w-[96%]">
            <div className={'w-full p-4  flex-col md:flex-row md:flex-wrap flex gap-4  bg-primary-gradient2 rounded-2xl h-fit d3-shadow4' + (!props?.product?.title ? ' shiny-element' : '')}>
              <div className="flex flex-col w-auto md:w-[calc(100%_-_300px)] md:min-w-[300px]">
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
                <div className={styles.cardPriceButton + ' relative !flex !flex-row w-fit  md:w-auto !p-0 !min-w-[210px]'}>
                  <div className='absolute -top-1 -left-2 bg-green-300 dark:bg-green-400 d3-shadow2 w-8 h-8 rounded-full flex items-center justify-center'>
                    <FontAwesomeIcon className='w-4 h-4 text-green-500 dark:text-green-700' icon={faCoins} />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className='mb-1 font-semibold italic flex w-full rounded-t-2xl text-md items-center justify-center p-1 bg-button-gradient3 d3-shadow '>{t('common:products:price')}
                    </span>

                    <div className="flex flex-col justify-center items-center pt-1 pb-3">
                      {(() => {
                        if (props.product.price?.isDiscount) {
                          return (<span className={styles.cardPriceButtonDiscountText + ' !text-md'}>
                            <FontAwesomeIcon icon={faAngleDown} />
                            <span className='sr-only'>Old Price: </span>
                            {props.product.price?.oldPrice?.toFixed(2)} $
                          </span>)
                        }
                      })()}
                      <span className={styles.cardPriceButtonText + ' !text-xl'}>
                        <span className='sr-only'>Price: </span>
                        {props.product.price?.price?.toFixed(2)} $
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'w-full p-1 flex-wrap lg:flex-nowrap sm:p-4 flex-row  flex gap-2 justify-evenly rounded-2xl h-fit' + (!props?.product?.title ? ' shiny-element' : '')}>
              <Button rightIcon={<FontAwesomeIcon className='w-5 h-5' icon={faCartShopping} />} onClick={() => { addToCart() }}
                text={`${addCartText || t('common:products:add-to-cart')}`} loading={loadingAddToCart} success={successAddToCart}
                className="text-lg w-full d3-shadow3 max-w-[335px]"></Button>
              <Button rightIcon={<FontAwesomeIcon className='w-5 h-5' icon={faCartShopping} />} onClick={() => { console.log('buy now') }} text={`${t('common:products:buy-now')}`}
                className="text-lg w-full bg-button-gradient2 d3-shadow3 max-w-[335px]"></Button>
            </div>

            <div className={'w-full p-4 flex-row flex-wrap flex gap-4 justify-evenly rounded-2xl h-fit' + (!props?.product?.title ? ' shiny-element' : '')}>
              <div className='flex gap-2 items-center relative bg-primary-gradient2 w-fit  md:w-auto px-4 p-2 d3-shadow3 rounded-lg'>
                <div className="flex gap-4 items-center justify-center">
                  <div className='bg-primary-gradient2  d3-shadow3 w-6 h-6 rounded-full flex items-center justify-center'>
                    <FontAwesomeIcon className='w-4 h-4 text-primary-300 dark:text-primary-200 ' icon={faStar} />
                  </div>
                  <span className={'font-medium text-md text-primary-500'}>
                    {t('common:products:rating')}:
                  </span>
                </div>

                <span className={'font-medium text-md ' + (props.product?.rating > 3.5 ? 'text-green-400' : '')}>
                  {props.product.rating}
                </span>
              </div>

              {props.product?.categories?.length > 0 &&
                [...props.product.categories].map((cat: any, i: any) => {
                  return (
                    <div key={i} className='flex gap-2 items-center relative bg-primary-gradient2 w-fit  md:w-auto px-4 p-2 d3-shadow3 rounded-lg'>
                      <div className="flex gap-4 items-center justify-center">
                        <div className='bg-primary-gradient2  d3-shadow3 w-6 h-6 rounded-full flex items-center justify-center'>
                          <FontAwesomeIcon className='w-4 h-4 text-primary-300 dark:text-primary-200 ' icon={faTag} />
                        </div>
                        <span className={'font-medium text-md text-primary-500'}>
                          {t('common:products:category')}:

                        </span>
                      </div>

                      <span className={'font-medium text-md '}>
                        {cat.name}
                      </span>
                    </div>
                  )
                })
              }
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