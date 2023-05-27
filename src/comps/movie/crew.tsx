import Link from 'next/link'
import { gql, useQuery } from 'urql'
import { Poster } from '~/comps/poster'
import type { Movie } from '~/types/tmdb'
import type { Props } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      credits {
        crew {
          job
          id
          name
          profile_path
        }
      }
    }
  }
`

type Data = { movie: { credits: Movie['credits'] } }
type Vars = Props
function useCrewQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function Crew(props: Props) {
  const [res] = useCrewQuery(props)
  const crew = res.data?.movie?.credits?.crew

  return (
    <div className='col space-y-2 mb-2'>
      {crew?.map((x, i) => (
        <Link href={`/person/${x.id}`} className='row' key={i}>
          <Poster path={x.profile_path} />
          <div className='col'>
            <div>{x.name}</div>
            <div>{x.job}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
