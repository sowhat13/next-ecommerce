// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from "cookies-next";
import api from '../../../api';


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    //@ts-ignore
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  try {

    let result = null
    //@ts-ignore
    if (!process.env.NEXT_PUBLIC_API_URL) return
    const url = process.env.NEXT_PUBLIC_API_URL + `auth/login`
    const body = JSON.stringify(req.body)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetch(url, options)
    result = await response.json()
    if (result) {
      if (result.token) {
        setCookie("token", result.token, {
          req, res,
          httpOnly: true,
        });
        const options: any = { headers: { Authorization: `${result.token}` } };
        const userRes = await api.request('/user/profile', undefined, options);
        result.user = userRes.data;
      }
      res.status(200).json(result)
    } else {
      //@ts-ignore
      res.status(401).json({ message: 'Server error', code: 0 })
    }
  } catch (err) {
    //@ts-ignore

    res.status(404).json({ message: 'Email or password is incorrect...', code: 0, error: err })

  }
}
