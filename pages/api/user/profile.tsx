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
        const url = process.env.NEXT_PUBLIC_API_URL + `users/profile${query ? '?' + query : ''}`
        const token = req?.cookies?.token || req?.headers?.authorization
        const headers: any = {}
        if (token) { headers.authorization = token }
        else {
            const response: any = {
                message: "Token is missing...",
                code: 500
            }
            return res.status(200).json(response)
        }
        const options: any = {
            method: 'GET',
            headers: headers,
            credentials: 'include',

        };
        const response = await fetch(url, options)
        result = await response.json()
        if (result) {
            return res.status(200).json(result)
        } else {
            const response: any = {
                message: "Couldn't find profile info...",
                code: 500
            }
            return res.status(200).json(response)
        }

    } catch (err) {
        const response: any = {
            message: "Couldn't find profile info...",
            code: 500,
            error: err
        }
        return res.status(200).send(response)

    }
}
