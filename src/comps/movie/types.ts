import { z } from 'zod'

export const tabs = ['Info', 'Cast', 'Crew', 'Images', 'Videos'] as const
const zTabs = z.enum(tabs)
export type Tabs = z.infer<typeof zTabs>

export const zQueries = z.object({
  id: z.string().optional().default(''),
  tab: zTabs.optional().default('Info'),
  page: z.coerce.number().optional().default(1),
  query: z.string().optional().default(''),
})

export type Queries = z.infer<typeof zQueries>

type ReplaceQueries = (update: Partial<Queries>) => void

export type Props = {
  queries: Queries
  replaceQueries: ReplaceQueries
}

export const releaseTypes = [
  '',
  'Premiere',
  'Theatrical (limited)',
  'Theatrical',
  'Digital',
  'Physical',
  'TV',
] as const
