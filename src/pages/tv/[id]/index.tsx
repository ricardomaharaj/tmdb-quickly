import { useRouter } from 'next/router'

import { TVCredits } from '~/comps/tv/credits'

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

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

  return (
    <>
      <div className='row'>
        <div className='col'>
          <img src={`${imageUrls.w94h141}${tv?.poster_path}`} alt='' />
        </div>
        <div className='col'>
          <div>{tv?.name}</div>
          <div>{tv?.tagline}</div>
        </div>
      </div>
      <div className='row space-x-4 overflow-scroll'>
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
          <div className='row'>
            <div className=''>{tv?.overview}</div>
          </div>

          <div className='row space-x-4 overflow-scroll'>
            {tv?.production_companies?.map((x, i) => (
              <div key={i}>{x?.name}</div>
            ))}
            {tv?.networks?.map((x, i) => (
              <div key={i}>{x?.name}</div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && <TVCredits />}
      {tab === Tabs.Seasons && <></>}
    </>
  )
}
