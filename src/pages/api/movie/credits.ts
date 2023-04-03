import { NextApiHandler } from 'next'
import { tmdbApi } from '@/util/tmdb-api'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id as string
    const x = await tmdbApi.movie.credits({ id })
    return res.json(x)
  }
  return res.status(501).send('501')
}

export default handler
