import { z } from 'zod'
import { useRouterQuery } from '~/hooks/router-query'

export const tvTabs = [
  'Info',
  'Seasons',
  'Cast',
  'Crew',
  'Images',
  'Videos',
] as const

const zTabs = z.enum(tvTabs)

const zQueries = z.object({
  id: z.string().default(''),
  tab: zTabs.default('Info'),
  query: z.string().default(''),
  page: z.coerce.number().default(1),
})

export function useTVState() {
  const queries = useRouterQuery(zQueries)
  return { queries }
}

export type TVProps = {
  queries: z.infer<typeof zQueries>
}
