import { readFileSync } from 'fs'
import { createSchema, createYoga } from 'graphql-yoga'
import { Args } from '~/types/args'
import { Yoga } from '~/types/yoga'
import { TMDB } from '~/util/tmdb-api'

const schema = createSchema<Yoga>({
  typeDefs: readFileSync('./gql/schema.gql').toString('utf-8'),
  resolvers: {
    Query: {
      search: async (_, args: Pick<Args, 'query' | 'page'>) => {
        const { query, page } = args

        if (!query) return await TMDB.trending()
        return await TMDB.search({ query, page })
      },
      movie: async (_, args: Pick<Args, 'id' | 'query' | 'page'>) => {
        const { id, query, page } = args

        if (!id) return
        const movie = await TMDB.movie({ id })

        const perPage = 9
        const start = (page - 1) * perPage
        const end = page * perPage

        if (movie?.credits?.cast) {
          let cast = movie.credits.cast
          if (query) {
            cast = cast.filter((x) =>
              JSON.stringify(x).toLowerCase().includes(query.toLowerCase()),
            )
          }
          cast = cast.slice(start, end)
          movie.credits.cast = cast
        }

        if (movie?.credits?.crew) {
          let crew = movie?.credits?.crew
          if (query) {
            crew = crew.filter((x) =>
              JSON.stringify(x).toLowerCase().includes(query.toLowerCase()),
            )
          }
          crew = crew.slice(start, end)
          movie.credits.crew = crew
        }

        if (movie?.images?.posters) {
          movie.images.posters = movie.images.posters
            .filter(({ iso_639_1 }) => iso_639_1 === 'en' || !iso_639_1)
            .slice(start, end)
        }

        if (movie?.images?.backdrops) {
          movie.images.backdrops = movie.images.backdrops
            .filter(({ iso_639_1 }) => iso_639_1 === 'en' || !iso_639_1)
            .slice(start, end)
        }

        if (movie.videos?.results) {
          movie.videos.results = movie.videos.results.slice(start, end)
        }

        return movie
      },
      tv: async (_, args: Pick<Args, 'id' | 'query' | 'page'>) => {
        const { id, query, page } = args

        if (!id) return
        const TV = await TMDB.tv({ id })

        const perPage = 9
        const start = (page - 1) * perPage
        const end = page * perPage

        if (TV.aggregate_credits?.cast) {
          let cast = TV.aggregate_credits.cast
          if (query) {
            cast = cast.filter((x) =>
              JSON.stringify(x).toLowerCase().includes(query.toLowerCase()),
            )
          }
          cast = cast.slice(start, end)
          TV.aggregate_credits.cast = cast
        }

        if (TV.aggregate_credits?.crew) {
          let crew = TV.aggregate_credits.crew
          if (query) {
            crew = crew.filter((x) =>
              JSON.stringify(x).toLowerCase().includes(query.toLowerCase()),
            )
          }
          crew = crew.slice(start, end)
          TV.aggregate_credits.crew = crew
        }

        return TV
      },
      season: async (_, args: Pick<Args, 'id' | 'season_number'>) => {
        const { id, season_number } = args
        return await TMDB.season({ id, season_number })
      },
      episode: async (
        _,
        args: Pick<Args, 'id' | 'season_number' | 'episode_number'>,
      ) => {
        const { id, season_number, episode_number } = args
        return await TMDB.episode({ id, season_number, episode_number })
      },
    },
  },
})

const yoga = createYoga<Yoga>({
  schema,
  graphqlEndpoint: '/api/gql',
})

export default yoga
