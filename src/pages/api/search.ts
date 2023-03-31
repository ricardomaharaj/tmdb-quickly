import { tmdbApi } from "@/util/tmdb-api"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { query, page } = req.query as Record<string, string>
    if (!query) {
      const x = await tmdbApi.trending()
      return res.json(x)
    }
    const x = await tmdbApi.search({ query, page })
    return res.json(x)
  }
  return res.status(501).send("501")
}

export default handler
