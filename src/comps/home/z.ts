import { z } from 'zod'

export const filters = ['', 'movie', 'tv', 'person'] as const
export const zFilters = z.enum(filters)
export type Filter = z.infer<typeof zFilters>

export const zQueries = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
  filter: zFilters.optional().default(''),
})

export type Queries = z.infer<typeof zQueries>
