import { getCookie } from "cookies-next";



export default function Currency(value: any, currency?: any) {
 
  if (!value) return 0;
  if (!currency){
    let currencyValue = getCookie('currency');
    currency = currencyValue || 'USD';
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}
