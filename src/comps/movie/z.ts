import { z } from 'zod'
import { useRouterQuery } from '~/hooks/router-query'

export const movieTabs = ['Info', 'Cast', 'Crew', 'Images', 'Videos'] as const
const zTabs = z.enum(movieTabs)

const zQueries = z.object({
  id: z.string().default(''),
  tab: zTabs.default('Info'),
  page: z.coerce.number().default(1),
  query: z.string().default(''),
})

export function useMovieState() {
  const queries = useRouterQuery(zQueries)
  return { queries }
}

export type MovieProps = {
  queries: z.infer<typeof zQueries>
}
