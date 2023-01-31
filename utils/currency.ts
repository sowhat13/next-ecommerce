import { getCookie } from "cookies-next";



export default function Currency(value: any, currency?: any) {
  let currencyValue = getCookie('currency') ;
  if (!value) return 0;
  if (!currency) currency = currencyValue || 'USD';
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}
