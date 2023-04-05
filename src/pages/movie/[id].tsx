import { useRouter } from 'next/router'

import { MovieCredits } from '~/comps/movie/credits'
import { imageUrls } from '~/consts'
import { useMovieQuery } from '~/util/gql'

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

  const [{ data }] = useMovieQuery({ variables: { id } })
  const movie = data?.movie

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

  return (
    <>
      <div className='row'>
        <div className='col'>
          <img src={`${imageUrls.w94h141}${movie?.poster_path}`} alt='' />
        </div>
      </div>
      <div className='row space-x-4'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'font-bold'}`}
            onClick={() => updateQueries({ tab: x })}
            key={i}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          {movie?.overview && (
            <div className='row'>
              <div className=''>{movie.overview}</div>
            </div>
          )}
          <div className='row space-x-2 overflow-scroll'>
            {movie?.production_companies?.map((x, i) => (
              <div key={i}>{x?.name}</div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && <MovieCredits />}
    </>
  )
}
