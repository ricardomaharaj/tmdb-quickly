import Link from 'next/link'
import { gql, useQuery } from 'urql'
import { Poster } from '~/comps/poster'
import type { Movie } from '~/types/tmdb'
import type { Props } from './types'

const query = gql`
  query ($id: ID!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      credits {
        cast {
          character
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
function useCastQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

export function Cast(props: Props) {
  const [res] = useCastQuery(props)
  const cast = res.data?.movie?.credits?.cast

  return (
    <div className='col space-y-2 mb-2'>
      {cast?.map((x, i) => (
        <Link href={`/person/${x.id}`} className='row' key={i}>
          <Poster path={x.profile_path} />
          <div className='col'>
            <div>{x.name}</div>
            <div>{x.character}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
