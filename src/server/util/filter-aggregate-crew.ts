import { AggregateCrew } from '~/types/tmdb'
import { getPaginatePos } from './paginate-pos'

export function filterAggregateCrew(args: {
  crew?: AggregateCrew[]
  query?: string
  page?: number
}) {
  const q = args.query?.toLowerCase()

  const cast = args.crew?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.jobs?.some((y) => y.job?.toLowerCase().includes(q))) {
      return true
    }
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return cast?.slice(start, end)
}
