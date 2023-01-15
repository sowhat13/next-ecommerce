import api from '../../api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
type Props = {
  // Add custom props here
}

function About(props: any) {


  return (
    <div >
      <span>
        {props.products.map((home: any) => <div key={home._id}>{home.title}</div>)}
      </span>
    </div>
  )
}


export async function getServerSideProps({ query, req, res, locale }: any) {
  const options: any = {};
  // if (req && req.headers) options.headers = { ...req.headers }
  const productsRes = await api.request('/products', query, options);
  const products = productsRes.code === 200 ? productsRes.data : null;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sign'
      ])),
      products
    }
  };
}

export default About