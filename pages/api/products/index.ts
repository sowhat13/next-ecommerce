// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {

    let result = null
    //@ts-ignore

    const query = new URLSearchParams(req.query).toString()
    if (!process.env.NEXT_PUBLIC_API_URL) return
    const url = process.env.NEXT_PUBLIC_API_URL + `api/products${query ? '?' + query : ''}`
    console.log(url,query)
    const options = {
      method: 'GET',

    };
    const response = await fetch(url, options)
    result = await response.json()
    res.status(200).json(result)

  } catch (err) {
    console.log(err);
    //@ts-ignore

    res.status(200).send({message:"Couldn't get products...", code: 500})

  }
}
