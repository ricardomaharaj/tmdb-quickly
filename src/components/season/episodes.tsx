import Link from 'next/link'
import { gql } from 'urql'
import { usePath } from '~/hooks/path'
import { SeasonProps } from '~/types/props'
import { SeasonEpisode } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { useSeasonQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      episodes {
        air_date
        episode_number
        name
        overview
        runtime
        still_path
      }
    }
  }
`

export default function Episodes({ id, season_number }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number })
  const episodes = res.data?.season?.episodes

  return (
    <>
      <div className='grid123 mb-2'>
        {episodes?.map((episode, i) => (
          <EpisodeCard
            episode={episode}
            season_number={season_number}
            key={i}
          />
        ))}
      </div>
    </>
  )
}

function EpisodeCard({
  episode,
  season_number,
}: {
  episode?: SeasonEpisode
  season_number?: number
}) {
  const path = usePath()
  return (
    <>
      <Link
        href={`${path}/episode/${episode?.episode_number}`}
        className='rounded-xl bg-cover bg-center'
        style={{
          backgroundImage: `url('${imageUrls.w500}/${episode?.still_path}')`,
        }}
      >
        <div className='col h-full rounded-xl bg-black bg-opacity-50 px-6 py-8'>
          <p className='row mb-2'>
            {episode?.name ?? ''}
            <br />
            {`S${season_number} E${episode?.episode_number} | ${
              episode?.air_date ?? ''
            }`}
          </p>
          <div>
            <p className='line-clamp-3'>
              {episode?.overview || 'No overview for this episode'}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}
