import { gql } from 'urql'
import { useEpisodeQuery } from '~/components/episode/query'
import { VideoCard } from '~/components/reusable/video-card'
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
      videos {
        results {
          name
          key
          published_at
        }
      }
    }
  }
`

export default function Videos(props: EpisodeProps) {
  const [res] = useEpisodeQuery(gqlQuery, props)
  const videos = res.data?.episode?.videos?.results

  return (
    <>
      <div className='grid234'>
        {videos?.map((x, i) => (
          <VideoCard ytKey={x.key} pri={x.name} sec={x.published_at} key={i} />
        ))}
      </div>
    </>
  )
}
