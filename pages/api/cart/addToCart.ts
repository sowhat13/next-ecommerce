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
        console.log(url, 'url', req.body)
        const token = req?.cookies?.token

        console.log(req.body, 'req body')
        const options: any = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            ...(token && { headers: { Authorization: `${token}`, 'Content-Type': 'application/json; charset=utf-8', } }),
            body: JSON.stringify(req.body)
        };
        console.log(options, 'options')
        const response = await fetch(url, options)
        result = await response.json()
        console.log(result, 'result')
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
