import Link from 'next/link'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { Props } from '~/types/movie'
import { Movie } from '~/types/tmdb'

const movieCreditsQuery = gql`
  query MovieCredits($id: ID!) {
    movie(id: $id) {
      credits {
        cast {
          character
          id
          name
          profile_path
        }
        crew {
          id
          job
          name
          profile_path
        }
      }
    }
  }
`

export function MovieCredits(props: Props) {
  const { id, page, query, tab, updateQueries } = props

  const [{ data }] = useQuery<{ movie: Movie }>({
    query: movieCreditsQuery,
    variables: { id },
  })
  const credits = data?.movie?.credits

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
          defaultValue={query}
          onChange={(e) => updateQueries({ query: e.target.value, page: 1 })}
        />
      </div>
      <div className='grid123'>
        {tab === Tabs.Cast && (
          <>
            {cast?.map((x, i) => (
              <Link href={`/person/${x?.id}`} className='row' key={i}>
                <div className='col mr-2'>
                  <Img src={x?.profile_path} />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>{x?.character}</div>
                </div>
              </Link>
            ))}
          </>
        )}
        {tab === Tabs.Crew && (
          <>
            {crew?.map((x, i) => (
              <Link href={`/person/${x?.id}`} className='row' key={i}>
                <div className='col mr-2'>
                  <Img src={x?.profile_path} />
                </div>
                <div className='col'>
                  <div>{x?.name}</div>
                  <div>{x?.job}</div>
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
