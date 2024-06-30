import { createSchema } from 'graphql-yoga'
import { movieResolver } from '~/server/gql/resolvers/movie'
import { personResolver } from '~/server/gql/resolvers/person'
import { searchResolver } from '~/server/gql/resolvers/search'
import { tvResolver } from '~/server/gql/resolvers/tv'
import { tvEpisodeResolver } from '~/server/gql/resolvers/tv-episode'
import { tvSeasonResolver } from '~/server/gql/resolvers/tv-season'
import { typeDefs } from '~/server/gql/typeDefs'

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      search: searchResolver,
      movie: movieResolver,
      tv: tvResolver,
      tvSeason: tvSeasonResolver,
      tvEpisode: tvEpisodeResolver,
      person: personResolver,
    },
  },
})
