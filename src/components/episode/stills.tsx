import { gql } from 'urql'
import { useEpisodeQuery } from '~/components/episode/query'
import { ImageCard } from '~/components/reusable/image-card'
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
      images {
        stills {
          file_path
        }
      }
    }
  }
`

export default function Stills(props: EpisodeProps) {
  const [res] = useEpisodeQuery(gqlQuery, props)
  const stills = res.data?.episode?.images?.stills

  return (
    <>
      <div className='grid234'>
        {stills?.map((x, i) => <ImageCard path={x.file_path} key={i} />)}
      </div>
    </>
  )
}
