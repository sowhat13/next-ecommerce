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
        const url = process.env.NEXT_PUBLIC_API_URL + `api/carts/add-to-cart${req.query && req.query.slug ? ('/' + req.query.slug) : query ? '?' + query : ''}`
        const token = req?.cookies?.token

        console.log(req.cookies, 'req cookies')
        const options: any = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                ...(token &&   { Authorization: `${token}`  }),
                ...(req.cookies &&   { cookies: JSON.stringify(req.cookies)  }),
            },
            credentials: 'include',
            body: JSON.stringify(req.body)
        };
        const response = await fetch(url, options)
        result = await response.json()
        if (result) {
            res.status(200).json(result)
        } else {

            //@ts-ignore
            res.status(200).json({ message: "Couldn't get cart...", code: 500 })
        }

    } catch (err) {
        console.log('bugggggg@@@@@@@', err)
        //@ts-ignore
        res.status(200).send({ message: "Couldn't get cart...", error: err, code: 500 })

    }
}
