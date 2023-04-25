import { z } from 'zod'

export const tabs = [
  'Info',
  'Cast',
  'Crew',
  'Seasons',
  'Images',
  'Videos',
] as const
export const zTabs = z.enum(tabs)

export const zQueries = z.object({
  id: z.string().optional(),
  tab: zTabs.optional().default('Info'),
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
})

export type Queries = z.infer<typeof zQueries>

type UpdateQueries = (update: Partial<Queries>) => void

export type Props = Queries & {
  updateQueries: UpdateQueries
}
