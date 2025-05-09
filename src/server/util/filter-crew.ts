import { Crew } from '~/server/types/gql'
import { getPaginatePos } from './paginate-pos'

export function filterCrew(args: {
  crew?: Crew[]
  query?: string
  page?: number
}) {
  const q = args.query?.toLowerCase()

  let crew = args.crew

  let tmpCrew: Crew[] = []

  crew?.forEach((x) => {
    const i = tmpCrew.findIndex((y) => y.id === x.id)
    if (i !== -1) tmpCrew[i].job += ` | ${x.job}`
    else tmpCrew.push(x)
  })

  crew = tmpCrew

  crew = crew?.filter((x) => {
    if (!q) return true
    if (x.name?.toLowerCase().includes(q)) return true
    if (x.job?.toLowerCase().includes(q)) return true
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return crew?.slice(start, end)
}
