import { Cast } from '~/types/tmdb'
import { getPaginatePos } from './paginate-pos'

export function filterCast(args: {
  cast?: Cast[]
  query?: string
  page?: number
}) {
  const q = args.query?.toLowerCase()
  const cast = args.cast?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.character?.toLowerCase().includes(q)) return true
    return false
  })
  const { start, end } = getPaginatePos(args.page ?? 1)
  return cast?.slice(start, end)
}
