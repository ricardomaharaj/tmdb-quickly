import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { MovieCredits } from '~/comps/movie/credits'
import { MovieImages } from '~/comps/movie/images'
import { MovieVideos } from '~/comps/movie/videos'
import { Movie } from '~/types/tmdb'
import { useTitle } from '~/util'

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

export enum Tabs {
  Info = 'Info',
  Cast = 'Cast',
  Crew = 'Crew',
  Images = 'Images',
  Videos = 'Videos',
}

export default function MoviePage() {
  const router = useRouter()

  const id = router.query.id as string
  const tab = (router.query.tab as Tabs) || Tabs.Info
  const query = (router.query.query as string) || ''
  const page = parseInt((router.query.page as string) || '1')

  const updateQueries = (update: any) => {
    router.replace({ query: { id, tab, query, page, ...update } })
  }

  const [{ data }] = useQuery<{ movie: Movie }>({
    query: movieQuery,
    variables: { id },
  })
  const movie = data?.movie

  useTitle(movie?.title)

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

  return (
    <>
      <div className='row'>
        <div className='col mr-2'>
          <Img src={movie?.poster_path} />
        </div>
        <div className='col'>
          <div>{movie?.release_date}</div>
          <div>{movie?.title}</div>
          <div>{movie?.tagline}</div>
        </div>
      </div>
      <div className='row space-x-4'>
        {Object.values(Tabs).map((x, i) => (
          <button
            onClick={() => updateQueries({ tab: x, page: 1 })}
            className={`${tab === x && 'font-bold'}`}
            key={i}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          <div className='row'>
            <div>{movie?.overview}</div>
          </div>

          <div className='col'>
            <div>Status: {movie?.status}</div>
            <div>Budget: {movie?.budget}</div>
            <div>Revenue: {movie?.revenue}</div>
            <div>Runtime: {movie?.runtime}m</div>
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
      {castOrCrewTab && <MovieCredits />}
      {tab === Tabs.Images && <MovieImages id={id} />}
      {tab === Tabs.Videos && <MovieVideos id={id} />}
    </>
  )
}
