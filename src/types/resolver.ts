type Args = {
  query: string
  page: string
  id: string
  season: string
  episode: string
}

export type Resolver = (_: any, args: Args) => Promise<any>

export type ResolverObject = {
  Query: Record<string, Resolver>
}
