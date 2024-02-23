import { AggregateCast } from '~/types/tmdb'
import { getPaginatePos } from './paginate-pos'

export function filterAggregateCast(args: {
  cast?: AggregateCast[]
  query?: string
  page?: number
}) {
  const q = args.query?.toLowerCase()
  const cast = args.cast?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.roles?.some((y) => y.character?.toLowerCase().includes(q))) {
      return true
    }
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)
  return cast?.slice(start, end)
}
