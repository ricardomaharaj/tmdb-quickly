import { CombinedCast } from '~/types/tmdb'
import { getPaginatePos } from './paginate-pos'

export function filterCombinedCast(args: {
  cast?: CombinedCast[]
  query?: string
  page?: number
  filter?: string
}) {
  const q = args.query?.toLowerCase()

  let cast = args.cast?.filter((x) => {
    if (!args.filter) return true
    if (x.media_type === args.filter) return true
    return false
  })

  cast = cast?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.title?.toLowerCase().includes(q)) return true
    if (x.character?.toLowerCase().includes(q)) return true
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return cast
    ?.sort((a, b) => {
      const aDate = new Date(a.release_date! || a.first_air_date!)
      const bDate = new Date(b.release_date! || b.first_air_date!)
      return aDate > bDate ? -1 : 1
    })
    .slice(start, end)
}
