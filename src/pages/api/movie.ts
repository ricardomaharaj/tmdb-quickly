import { tmdbApi } from '@/util/tmdb-api'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query as Record<string, string>
  const x = await tmdbApi.movieCredits({ id })
  return res.json(x)
}

export default handler
