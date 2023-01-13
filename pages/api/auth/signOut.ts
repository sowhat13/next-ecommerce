// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from "cookies-next";


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

        deleteCookie("token", {
            req, res,
            httpOnly: true,
        });
        //@ts-ignore

        res.status(200).json({ message: 'Logged out successfully', code: 1 })

    } catch (err) {
        //@ts-ignore

        res.status(404).json({ message: 'Something went wrong...', code: 0, error: err })

    }
}
