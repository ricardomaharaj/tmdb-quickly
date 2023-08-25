import { gql } from 'urql'
import { useEpisodeQuery } from '~/components/episode/query'
import { Overview } from '~/components/reusable/overview'
import { EpisodeProps } from '~/types/props'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $episode_number: Int!) {
    episode(
      episode_number: $episode_number
      id: $id
      season_number: $season_number
    ) {
      overview
    }
  }
`

export default function Info(props: EpisodeProps) {
  const [res] = useEpisodeQuery(gqlQuery, props)
  const episode = res.data?.episode

  return (
    <>
      <Overview fetching={res.fetching} overview={episode?.overview} />
    </>
  )
}
