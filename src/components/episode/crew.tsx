import Link from 'next/link'
import { gql } from 'urql'
import { useEpisodeQuery } from '~/components/episode/query'
import { PosterCard } from '~/components/reusable/poster-card'
import { EpisodeProps } from '~/types/props'

const gqlQuery = gql`
  query (
    $id: String!
    $season_number: Int!
    $episode_number: Int!
    $query: String
    $page: Int
  ) {
    episode(
      episode_number: $episode_number
      id: $id
      season_number: $season_number
      query: $query
      page: $page
    ) {
      credits {
        crew {
          id
          name
          profile_path
          job
        }
      }
    }
  }
`

export default function Crew(props: EpisodeProps) {
  const [res] = useEpisodeQuery(gqlQuery, props)
  const cast = res.data?.episode?.credits?.cast
  return (
    <>
      <div className='grid123'>
        {cast?.map((x, i) => (
          <Link href={`/person/${x.id}`} key={i}>
            <PosterCard path={x.profile_path} pri={x.name} sec={x.character} />
          </Link>
        ))}
      </div>
    </>
  )
}
