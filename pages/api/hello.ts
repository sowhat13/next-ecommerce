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
    const params = { q: 'new york', locale: 'en_US', langid: '1033', siteid: '300000001' }

    const url = 'https://hotels4.p.rapidapi.com/locations/v3/search' + '?' + new URLSearchParams(params)

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '05e3326a6emsh95bf3a06e3df5cdp16038ajsnb7284cc07e39',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      },
    };
    const response = await fetch(url, options)
    result = await response.json()
    res.status(200).json( result )

  } catch (err) {
    console.log(err);
    //@ts-ignore

    res.status(200).send('error')

  }
}