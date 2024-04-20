import { getPaginatePos } from '~/server/util/paginate-pos'
import { Cast } from '~/types/tmdb'

export function filterCast(args: {
  cast?: Cast[]
  query?: string
  page?: number
}) {
  const q = args.query?.toLowerCase()

  let cast = args.cast

  let tmpCast: Cast[] = []

  cast?.forEach((x) => {
    const i = tmpCast.findIndex((y) => y.id === x.id)
    if (i !== -1) tmpCast[i].character += ` | ${x.character}`
    else tmpCast.push(x)
  })

  cast = tmpCast

  cast = args.cast?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.character?.toLowerCase().includes(q)) return true
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return cast?.slice(start, end)
}
