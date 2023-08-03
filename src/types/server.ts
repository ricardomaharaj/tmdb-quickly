export type Args = {
  id: string
  query: string
  page: number
  season_number: number
  episode_number: number
}

export type Resolver<T> = (_: unknown, args: Args) => Promise<T>
