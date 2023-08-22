import { gql } from 'urql'
import { LinkCard } from '~/components/reusable/link-card'
import { MovieProps } from '~/types/props'
import { useMovieQuery } from './query'

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

export default function Cast({ id, query, page }: MovieProps) {
  const [res] = useMovieQuery(gqlQuery, { id, query, page })
  const cast = res.data?.movie?.credits?.cast

  return (
    <div className='grid123'>
      {cast?.map((x, i) => (
        <LinkCard
          href={`/person/${x.id}`}
          path={x.profile_path}
          pri={x.name}
          sec={x.character}
          key={i}
        />
      ))}
    </div>
  )
}
