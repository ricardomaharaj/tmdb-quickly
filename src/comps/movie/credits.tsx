import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { Tabs } from '~/pages/movie/[id]/index'
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

export function MovieCredits() {
  const router = useRouter()

  const queries = router.query as Record<string, string | undefined>

  const id = queries.id!
  const query = queries.query || ''
  const page = parseInt(queries.page || '1')
  const tab = (queries.tab as Tabs) || Tabs.Cast

  const updateQueries = (update: any) => {
    router.replace({ query: { id, query, page, tab, ...update } })
  }

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
          className='mt-2 w-full border-2 p-1 pl-2'
          placeholder='Filter'
          defaultValue={query}
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
                  <div>{x?.character}</div>
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
                  <div>{x?.job}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className='row justify-evenly pt-2'>
        <button
          disabled={page <= 1}
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
