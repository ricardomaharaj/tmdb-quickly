import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  return res.status(501).send("501")
}

export default handler
