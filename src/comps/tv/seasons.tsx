import { gql, useQuery } from 'urql'

import { Img } from '~/comps/image'
import { TV } from '~/types/tmdb'
import { trimmer } from '~/util'

const tvSeasonQuery = gql`
  query Seasons($id: ID!) {
    tv(id: $id) {
      seasons {
        air_date
        episode_count
        name
        overview
        poster_path
        season_number
      }
    }
  }
`

export function TVSeasons({ id }: { id: string }) {
  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvSeasonQuery,
    variables: { id },
  })
  const seasons = data?.tv.seasons
  return (
    <>
      {seasons?.map((x, i) => (
        <div className='row' key={i}>
          <div className='col mr-2'>
            <Img src={x.poster_path} />
          </div>
          <div className='col'>
            <div>{x.name}</div>
            <div>{x.air_date}</div>
            <div>{x.episode_count} Episodes</div>
            <div>{trimmer(x.overview)}</div>
          </div>
        </div>
      ))}
    </>
  )
}
