import { gql } from 'urql'
import { Card } from '~/comps/card'
import { removeVoiceTag } from '~/util/voice-tag'
import { useMovieQuery } from './query'
import type { Props } from './z'

export default function Cast(props: Props) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useMovieQuery({
    query: gql`
      query ($id: String!, $query: String, $page: Int) {
        movie(id: $id, query: $query, page: $page) {
          credits {
            cast {
              id
              name
              character
              profile_path
            }
          }
        }
      }
    `,
    variables: { id, query, page },
  })
  const cast = res.data?.movie?.credits?.cast

  return (
    <div className='col mb-2 space-y-2'>
      {cast?.map((x, i) => (
        <Card
          href={`/person/${x.id}`}
          image={x.profile_path}
          primary={x.name}
          secondary={removeVoiceTag(x.character)}
          key={i}
        />
      ))}
    </div>
  )
}
