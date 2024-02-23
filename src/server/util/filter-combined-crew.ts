import { CombinedCrew } from '~/types/tmdb'
import { getPaginatePos } from './paginate-pos'

export function filterCombinedCrew(args: {
  crew?: CombinedCrew[]
  query?: string
  page?: number
  filter?: string
}) {
  const q = args.query?.toLowerCase()

  let crew = args.crew?.filter((x) => {
    if (!args.filter) return true
    if (x.media_type === args.filter) return true
    return false
  })

  const tmpCrew: CombinedCrew[] = []
  crew?.forEach((x) => {
    const i = tmpCrew.findIndex((y) => y.id === x.id)
    if (i !== -1) tmpCrew[i].job += ` | ${x.job}`
    else tmpCrew.push(x)
  })

  crew = tmpCrew

  crew = crew?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.title?.toLowerCase().includes(q)) return true
    if (x.job?.toLowerCase().includes(q)) return true
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return crew
    ?.sort((a, b) => {
      const aDate = new Date(a.release_date! || a.first_air_date!)
      const bDate = new Date(b.release_date! || b.first_air_date!)
      return aDate > bDate ? -1 : 1
    })
    .slice(start, end)
}
