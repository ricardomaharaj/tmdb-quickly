import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { TVCredits } from '~/comps/tv/credits'
import { TVImages } from '~/comps/tv/images'
import { TVSeasons } from '~/comps/tv/seasons'
import { TVVideos } from '~/comps/tv/videos'
import { TV } from '~/types/tmdb'
import { tabs, zQueries } from '~/types/tv'
import { useTitle, zNumGt1 } from '~/util'

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

export function TVPage() {
  const router = useRouter()

  const { id, page, query, tab } = zQueries.parse(router.query)

  const updateQueries = (update: any) => {
    router.replace({
      query: { id, tab, query, page, ...update },
    })
  }

  const props = { id, page, query, tab, updateQueries }

  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvQuery,
    variables: { id },
  })
  const tv = data?.tv

  useTitle(tv?.name)

  const castOrCrewTab = tab === 'Cast' || tab === 'Crew'

  return (
    <>
      <div className='row'>
        <div className='col mr-2'>
          <Img src={tv?.poster_path} />
        </div>
        <div className='col'>
          {tv?.first_air_date && <div>{tv?.first_air_date}</div>}
          {tv?.name && <div>{tv?.name}</div>}
          {tv?.tagline && <div>{tv?.tagline}</div>}
        </div>
      </div>

      <div className='row space-x-4 overflow-scroll'>
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
          {tv?.overview && (
            <div className='row'>
              <div>{tv?.overview}</div>
            </div>
          )}

          <div className='col'>
            {tv?.status && <div>Status: {tv?.status}</div>}
            {tv?.type && <div>Type: {tv?.type}</div>}
            {zNumGt1(tv?.number_of_seasons) && (
              <div>Seasons: {tv?.number_of_seasons}</div>
            )}
            {tv?.number_of_episodes && (
              <div>Episodes: {tv?.number_of_episodes}</div>
            )}
            {zNumGt1(tv?.episode_run_time?.[0]) && (
              <div>Runtime: {tv?.episode_run_time?.[0]}m</div>
            )}
            {tv?.first_air_date && <div>First Aired: {tv?.first_air_date}</div>}
            {tv?.last_air_date && <div>Last Aired: {tv?.last_air_date}</div>}
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
      {castOrCrewTab && <TVCredits {...props} />}
      {tab === 'Seasons' && <TVSeasons id={id!} />}
      {tab === 'Images' && <TVImages id={id!} />}
      {tab === 'Videos' && <TVVideos id={id!} />}
    </>
  )
}
