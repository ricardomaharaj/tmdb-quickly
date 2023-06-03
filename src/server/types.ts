import { ID } from '~/types/id'

export type Args = {
  id: ID
  query: string
  page: number
  season_number: number
  episode_number: number
}

export type Resolver<T> = (_: unknown, args: Args) => Promise<T>
