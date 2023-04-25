import { z } from 'zod'

export const zQueries = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
})

export type Queries = z.infer<typeof zQueries>
