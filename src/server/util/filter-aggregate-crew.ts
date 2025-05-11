import { AggregateCrew } from '~/server/types/gql'
import { getPaginatePos } from './paginate-pos'

export function filterAggregateCrew(args: {
  crew?: AggregateCrew[]
  query?: string
  page?: number
}) {
  const query = args.query?.toLowerCase()

  let crew: AggregateCrew[] = []

  args.crew?.forEach((x) => {
    const i = crew.findIndex((y) => y.id === x.id)

    if (i === -1) crew.push(x)
    else crew[i].jobs!.push(...x.jobs!)
  })

  crew = crew.filter((x) => {
    if (!query) return true
    if (x.name?.toLowerCase().includes(query)) return true
    if (x.jobs?.some((x) => x.job?.toLowerCase().includes(query))) return true
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return crew?.slice(start, end)
}
