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


export async function getServerSideProps({ query, req, res }: any) {
  const options: any = {};
  // if (req && req.headers) options.headers = { ...req.headers }
  const productsRes = await api.request('/products', query, options);
  const products = productsRes.code === 200 ? productsRes.data : null;
  return {
    props: {
      products
    }
  };
}


export default About