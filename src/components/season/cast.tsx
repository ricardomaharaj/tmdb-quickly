import Link from 'next/link'
import { gql } from 'urql'
import { PosterCard } from '~/components/reusable/poster-card'
import { SeasonProps } from '~/types/props'
import { removeVoiceTag } from '~/util/voice-tag'
import { useSeasonQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $query: String, $page: Int) {
    season(id: $id, season_number: $season_number, query: $query, page: $page) {
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

export default function Cast({ id, season_number, query, page }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number, query, page })
  const cast = res.data?.season?.credits?.cast

  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => (
          <Link href={`/person/${x.id}`} key={i}>
            <PosterCard
              path={x.profile_path}
              pri={x.name}
              sec={removeVoiceTag(x.character)}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
