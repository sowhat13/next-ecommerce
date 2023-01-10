import api from '../../api';

function About(props: any) {

  return (
    <div >
      <span>
      {props.products.map((home: any) => <div key={home._id}>{home.title}</div>)}
      </span>
      about
    </div>
  )
}


About.getInitialProps = async ({ query }: any) => {
 
  const productsRes = await api.request('/products',query);
  const products = productsRes.code !== 500 ? productsRes : [];
  return { products };
}


export default About