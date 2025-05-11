import { AggregateCast } from '~/server/types/gql'
import { getPaginatePos } from './paginate-pos'

export function filterAggregateCast(args: {
  cast?: AggregateCast[]
  query?: string
  page?: number
}) {
  const query = args.query?.toLowerCase()

  let cast: AggregateCast[] = []

  args.cast?.forEach((x) => {
    const i = cast.findIndex((y) => y.id === x.id)

    if (i === -1) cast.push(x)
    else cast[i].roles!.push(...x.roles!)
  })

  cast = cast.filter((x) => {
    if (!query) return true
    if (x.name?.toLowerCase().includes(query)) return true
    if (x.roles?.some((x) => x.character?.toLowerCase().includes(query)))
      return true
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return cast?.slice(start, end)
}
