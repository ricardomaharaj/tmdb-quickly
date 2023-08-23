import Link from 'next/link'
import { gql } from 'urql'
import { PosterCard } from '~/components/reusable/poster-card'
import { TVProps } from '~/types/props'
import { useTVQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $query: String, $page: Int) {
    tv(id: $id, query: $query, page: $page) {
      aggregate_credits {
        cast {
          id
          name
          profile_path
          roles {
            character
            episode_count
          }
        }
      }
    }
  }
`

export default function Cast({ id, query, page }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id, query, page })
  const cast = res.data?.tv?.aggregate_credits?.cast

  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => (
          <Link href={`/person/${x.id}`} key={i}>
            <PosterCard
              path={x.profile_path}
              pri={x.name}
              sec={x.roles
                ?.slice(0, 2)
                .map((x) => `${x.character} (${x.episode_count})`)
                .join(' | ')}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
