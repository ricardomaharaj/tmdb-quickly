import { gql } from 'urql'
import { Card } from '~/comps/card'
import { removeVoiceTag } from '~/util/voice-tag'
import { useMovieQuery } from './query'
import { MovieProps } from './z'

const gqlQuery = gql`
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
`

export default function Cast(props: MovieProps) {
  const { queries } = props
  const { id, query, page } = queries

  const [res] = useMovieQuery(gqlQuery, { id, query, page })
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
