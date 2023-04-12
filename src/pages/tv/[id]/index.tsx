import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { TVCredits } from '~/comps/tv/credits'
import { TVImages } from '~/comps/tv/images'
import { TVSeasons } from '~/comps/tv/seasons'
import { TVVideos } from '~/comps/tv/videos'
import { TV } from '~/types/tmdb'
import { useTitle } from '~/util'

const tvQuery = gql`
  query TV($id: ID!) {
    tv(id: $id) {
      episode_run_time
      first_air_date
      genres {
        name
      }
      last_air_date
      name
      networks {
        name
      }
      number_of_episodes
      number_of_seasons
      overview
      poster_path
      production_companies {
        name
      }
      status
      tagline
      type
    }
  }
`

export enum Tabs {
  Info = 'Info',
  Cast = 'Cast',
  Crew = 'Crew',
  Seasons = 'Seasons',
  Images = 'Images',
  Videos = 'Videos',
}

export default function MoviePage() {
  const router = useRouter()

  const queries = router.query as Record<string, string | undefined>

  const id = queries.id!
  const tab = (queries.tab as Tabs | undefined) || Tabs.Info
  const query = queries.query || ''
  const page = parseInt(queries.page || '1')

  const updateQueries = (update: any) => {
    router.replace({
      query: { id, tab, query, page, ...update },
    })
  }

  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvQuery,
    variables: { id },
  })
  const tv = data?.tv

  useTitle(tv?.name)

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

  return (
    <>
      <div className='row'>
        <div className='col mr-2'>
          <Img src={tv?.poster_path} />
        </div>
        <div className='col'>
          <div>{tv?.first_air_date}</div>
          <div>{tv?.name}</div>
          <div>{tv?.tagline}</div>
        </div>
      </div>
      <div className='row space-x-4 overflow-scroll'>
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
            <div>{tv?.overview}</div>
          </div>
          <div className='col'>
            <div>Status: {tv?.status}</div>
            <div>Type: {tv?.type}</div>
            <div>Seasons: {tv?.number_of_seasons}</div>
            <div>Episodes: {tv?.number_of_episodes}</div>
            <div>Runtime: {tv?.episode_run_time?.[0]}m</div>
            <div>First Aired: {tv?.first_air_date}</div>
            <div>Last Aired: {tv?.last_air_date}</div>
          </div>
          <div className='row space-x-4 overflow-scroll'>
            {tv?.genres?.map((x, i) => (
              <div key={i}>{x.name}</div>
            ))}
          </div>
          <div className='row space-x-4 overflow-scroll'>
            {tv?.production_companies?.map((x, i) => (
              <div key={i}>{x.name}</div>
            ))}
            {tv?.networks?.map((x, i) => (
              <div key={i}>{x.name}</div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && <TVCredits />}
      {tab === Tabs.Seasons && <TVSeasons id={id} />}
      {tab === Tabs.Images && <TVImages id={id} />}
      {tab === Tabs.Videos && <TVVideos id={id} />}
    </>
  )
}
