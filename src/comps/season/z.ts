import { z } from 'zod'
import { useRouterQuery } from '~/hooks/router-query'

export const seasonTabs = [
  'Info',
  'Episodes',
  'Cast',
  'Crew',
  'Images',
  'Videos',
] as const
const zTabs = z.enum(seasonTabs)

const zQueries = z.object({
  id: z.string().default(''),
  season_number: z.coerce.number().default(1),
  tab: zTabs.default('Info'),
  query: z.string().default(''),
  page: z.coerce.number().default(1),
})

export function useSeasonState() {
  const queries = useRouterQuery(zQueries)
  return { queries }
}

export type SeasonProps = {
  queries: z.infer<typeof zQueries>
}
