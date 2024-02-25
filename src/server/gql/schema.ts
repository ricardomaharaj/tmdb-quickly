import { createSchema } from 'graphql-yoga'
import { movieResolver } from './resolvers/movie'
import { personResolver } from './resolvers/person'
import { searchResolver } from './resolvers/search'
import { tvResolver } from './resolvers/tv'
import { tvEpisodeResolver } from './resolvers/tv-episode'
import { tvSeasonResolver } from './resolvers/tv-season'
import { typeDefs } from './typeDefs'

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
