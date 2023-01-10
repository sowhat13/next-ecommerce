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
    const url = process.env.NEXT_PUBLIC_API_URL + `auth/login`
    console.log(url,query)
    const options = {
      method: 'POST',

    };
    const response = await fetch(url, options)
    result = await response.json()
    res.status(200).json(result)

  } catch (err) {
    console.log(err);
    //@ts-ignore

    res.status(200).send('error')

  }
}
