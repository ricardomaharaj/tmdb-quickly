import { yoga } from '~/server/gql/yoga'

const handler = async (req: Request) => {
  const res = await yoga.handleRequest(req, {})
  return new Response(res.body)
}

export default handler

export const config = { path: '/gql' }
