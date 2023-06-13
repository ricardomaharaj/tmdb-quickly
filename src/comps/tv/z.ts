import { z } from 'zod'

export const tabs = [
  'Info',
  'Seasons',
  'Cast',
  'Crew',
  'Images',
  'Videos',
] as const
export const zTabs = z.enum(tabs)
export type Tabs = z.infer<typeof zTabs>

export const zQueries = z.object({
  id: z.string().optional().default(''),
  tab: zTabs.optional().default('Info'),
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
})

export type Queries = z.infer<typeof zQueries>
export type Props = { queries: Queries }
