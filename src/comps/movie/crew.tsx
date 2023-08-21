import { gql } from 'urql'
import { Card } from '~/comps/card'
import { MovieProps } from '~/types/props'
import { useMovieQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $query: String, $page: Int) {
    movie(id: $id, query: $query, page: $page) {
      credits {
        crew {
          id
          name
          job
          profile_path
        }
      }
    }
  }
`

export default function Crew({ id, query, page }: MovieProps) {
  const [res] = useMovieQuery(gqlQuery, { id, query, page })
  const crew = res.data?.movie?.credits?.crew

  return (
    <div className='col mb-2 space-y-2'>
      {crew?.map((x, i) => (
        <Card
          href={`/person/${x.id}`}
          image={x.profile_path}
          primary={x.name}
          secondary={x.job}
          key={i}
        />
      ))}
    </div>
  )
}
