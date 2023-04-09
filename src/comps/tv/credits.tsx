import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { Tabs } from '~/pages/tv/[id]'
import { TV } from '~/types/tmdb'

const tvCreditsQuery = gql`
  query TVCredits($id: ID!) {
    tv(id: $id) {
      aggregate_credits {
        cast {
          id
          name
          profile_path
          roles {
            character
            episode_count
          }
        }
        crew {
          id
          jobs {
            episode_count
            job
          }
          name
          profile_path
        }
      }
    }
  }
`

export function TVCredits() {
  const router = useRouter()
  const queries = router.query as Record<string, string | undefined>

  const id = queries.id!
  const query = queries.query || ''
  const page = parseInt(queries.page || '1')
  const tab = (queries.tab as Tabs) || Tabs.Cast

  const updateQueries = (update: any) => {
    router.replace({ query: { id, query, page, tab, ...update } })
  }

  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvCreditsQuery,
    variables: { id },
  })
  const credits = data?.tv?.aggregate_credits

  const perPage = 9
  const startPage = (page - 1) * perPage
  const endPage = page * perPage

  const q = query.toLowerCase()

  const cast = credits?.cast
    ?.filter((x) => {
      if (!q) return true
      if (JSON.stringify(x).toLowerCase().includes(q)) return true
      return false
    })
    ?.slice(startPage, endPage)
  const crew = credits?.crew
    ?.filter((x) => {
      if (!q) return true
      if (JSON.stringify(x).toLowerCase().includes(q)) return true
      return false
    })
    ?.slice(startPage, endPage)

  return (
    <>
      <div className='row'>
        <input
          type='text'
          className='w-full border-2 p-1 pl-2'
          placeholder='Filter'
          onChange={(e) => updateQueries({ query: e.target.value })}
        />
      </div>
      <div className='grid123'>
        {tab === Tabs.Cast && (
          <>
            {cast?.map((x, i) => (
              <div key={i} className='row'>
                <div className='col'>
                  <img src={`${imageUrls.w94h141}${x?.profile_path}`} alt='' />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>
                    {x?.roles?.map(
                      (y) => `${y?.character} (${y?.episode_count} Eps)`
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {tab === Tabs.Crew && (
          <>
            {crew?.map((x, i) => (
              <div key={i} className='row'>
                <div className='col'>
                  <img src={`${imageUrls.w94h141}${x?.profile_path}`} alt='' />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>
                    {x?.jobs?.map((y) => `${y?.job} (${y?.episode_count} Eps)`)}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className='row justify-evenly pt-2'>
        <button
          onClick={() => updateQueries({ page: page - 1 })}
          className='px-8'
        >
          {'<'}
        </button>
        <div>{page}</div>
        <button
          onClick={() => updateQueries({ page: page + 1 })}
          className='px-8'
        >
          {'>'}
        </button>
      </div>
    </>
  )
}
