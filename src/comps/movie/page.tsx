import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { MovieCredits } from '~/comps/movie/credits'
import { MovieImages } from '~/comps/movie/images'
import { MovieVideos } from '~/comps/movie/videos'
import { Queries, tabs, zQueries } from '~/types/movie'
import { Movie } from '~/types/tmdb'
import { useTitle, zNumGt1 } from '~/util'

const movieQuery = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      budget
      genres {
        name
      }
      overview
      poster_path
      production_companies {
        name
      }
      release_date
      revenue
      runtime
      status
      tagline
      title
    }
  }
`

export function MoviePage() {
  const router = useRouter()

  const { id, page, query, tab } = zQueries.parse(router.query)

  const updateQueries = (update: Partial<Queries>) => {
    router.replace({ query: { id, tab, query, page, ...update } })
  }

  const creditProps = { id, page, query, tab, updateQueries }

  const [{ data }] = useQuery<{ movie: Movie }>({
    query: movieQuery,
    variables: { id },
  })

  const movie = data?.movie

  useTitle(movie?.title)

  const castOrCrewTab = tab === 'Cast' || tab === 'Crew'

  return (
    <>
      <div className='row'>
        <div className='col mr-2'>
          {movie?.poster_path && <Img src={movie?.poster_path} />}
        </div>
        <div className='col'>
          {movie?.release_date && <div>{movie?.release_date}</div>}
          {movie?.title && <div>{movie?.title}</div>}
          {movie?.tagline && <div>{movie?.tagline}</div>}
        </div>
      </div>
      <div className='row space-x-4'>
        {tabs.map((x, i) => (
          <button
            onClick={() => updateQueries({ tab: x, page: 1 })}
            className={`${tab === x && 'font-bold'}`}
            key={i}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === 'Info' && (
        <>
          {movie?.overview && (
            <div className='row'>
              <div>{movie?.overview}</div>
            </div>
          )}

          <div className='col'>
            {movie?.status && <div>Status: {movie?.status}</div>}
            {zNumGt1(movie?.budget) && <div>Budget: {movie?.budget}</div>}
            {zNumGt1(movie?.revenue) && <div>Revenue: {movie?.revenue}</div>}
            {zNumGt1(movie?.runtime) && <div>Runtime: {movie?.runtime}m</div>}
          </div>

          <div className='row space-x-4 overflow-scroll'>
            {movie?.genres?.map((x, i) => (
              <div key={i}>{x.name}</div>
            ))}
          </div>

          <div className='row space-x-4 overflow-scroll'>
            {movie?.production_companies?.map((x, i) => (
              <div key={i}>{x.name}</div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && <MovieCredits {...creditProps} />}
      {tab === 'Images' && <MovieImages id={id!} />}
      {tab === 'Videos' && <MovieVideos id={id!} />}
    </>
  )
}
