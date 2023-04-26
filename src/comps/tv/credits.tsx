import Link from 'next/link'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { TV } from '~/types/tmdb'
import { Props } from '~/types/tv'

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

export function TVCredits(props: Props) {
  const { id, query, page, tab, updateQueries } = props

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
          placeholder='Filter'
          className='w-full border-2 p-2 outline-none'
          onChange={(e) => updateQueries({ query: e.target.value, page: 1 })}
        />
      </div>
      <div className='grid123'>
        {tab === 'Cast' && (
          <>
            {cast?.map((x, i) => (
              <Link href={`/person/${x?.id}`} className='row' key={i}>
                <div className='col mr-2'>
                  <Img src={x?.profile_path} />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>
                    {x?.roles
                      ?.slice(0, 3)
                      ?.map((y) => `${y?.character} (${y?.episode_count} Eps)`)
                      ?.join(' | ')}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
        {tab === 'Crew' && (
          <>
            {crew?.map((x, i) => (
              <Link href={`/person/${x?.id}`} className='row' key={i}>
                <div className='col mr-2'>
                  <Img src={x?.profile_path} />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>
                    {x?.jobs
                      ?.slice(0, 3)
                      ?.map((y) => `${y?.job} (${y?.episode_count} Eps)`)
                      ?.join(' | ')}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className='row space-x-4'>
        <button
          disabled={page <= 1}
          onClick={() => updateQueries({ page: page - 1 })}
        >
          BACK
        </button>
        <div>{page}</div>
        <button onClick={() => updateQueries({ page: page + 1 })}>NEXT</button>
      </div>
    </>
  )
}
