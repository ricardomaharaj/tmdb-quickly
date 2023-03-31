import { tmdbApi } from "@/util/tmdb-api"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query as Record<string, string>
    const x = await tmdbApi.movie({ id })
    return res.json(x)
  }
  return res.status(501).send("501")
}

export default handler
