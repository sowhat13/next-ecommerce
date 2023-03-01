// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/types'

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
    const url = process.env.NEXT_PUBLIC_API_URL + `api/products/similar${ query ? '?' + query : ''}`
    const token = req?.cookies?.token
    const options: any = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token &&   { Authorization: `${token}`  }),
        ...(req.cookies &&   { cookies: JSON.stringify(req.cookies)  }),


      },
      credentials: 'include',

    };


    const response = await fetch(url, options)
    result = await response.json()

    if(result){
      res.status(200).json(result)
    }else {

    //@ts-ignore
      res.status(200).json({message:"Couldn't get products...", code: 500})
    }

  } catch (err) {
    console.log('bugggggg@@@@@@@',err)
    //@ts-ignore
    res.status(200).send({message:"Couldn't get products...", error:err, code: 500})

  }
}
