import { gql } from 'urql'
import { Card } from '~/comps/card'
import { useMovieQuery } from './query'
import type { Props } from './z'

export default function Crew(props: Props) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useMovieQuery({
    query: gql`
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
    `,
    variables: { id, query, page },
  })
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
