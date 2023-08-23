import Link from 'next/link'
import { gql } from 'urql'
import { PosterCard } from '~/components/reusable/poster-card'
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
    <div className='grid123'>
      {crew?.map((x, i) => (
        <Link href={`/person/${x.id}`}>
          <PosterCard path={x.profile_path} pri={x.name} sec={x.job} key={i} />
        </Link>
      ))}
    </div>
  )
}
