import { gql } from 'urql'
import { ImageCard } from '~/components/reusable/image-card'
import { SeasonProps } from '~/types/props'
import { useSeasonQuery } from './query'

const gqlQuery = gql`
  query ($id: String!, $season_number: Int!, $page: Int) {
    season(id: $id, season_number: $season_number, page: $page) {
      images {
        posters {
          file_path
          iso_639_1
        }
      }
    }
  }
`

export default function Images({ id, season_number, page }: SeasonProps) {
  const [res] = useSeasonQuery(gqlQuery, { id, season_number, page })
  const posters = res.data?.season?.images?.posters?.filter((x) => {
    if (!x.iso_639_1) return true
    if (x.iso_639_1 === 'en') return true
    return false
  })

  return (
    <>
      <div className='grid234'>
        {posters?.map((x, i) => <ImageCard path={x.file_path} key={i} />)}
      </div>
    </>
  )
}
