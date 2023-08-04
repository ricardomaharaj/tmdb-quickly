import Image from 'next/image'
import { gql } from 'urql'
import { useSeasonQuery } from '~/comps/season/query'
import { SeasonProps } from '~/comps/season/z'
import { imageUrls } from '~/util/image-urls'

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

export default function Images(props: SeasonProps) {
  const { queries } = props
  const { id, season_number, page } = queries

  const [res] = useSeasonQuery(gqlQuery, { id, season_number, page })
  const posters = res.data?.season?.images?.posters?.filter((x) => {
    if (!x.iso_639_1) return true
    if (x.iso_639_1 === 'en') return true
    return false
  })

  return (
    <>
      <div className='grid234 mb-2'>
        {posters?.map((x, i) => (
          <Image
            src={`${imageUrls.w500}${x.file_path}`}
            alt=''
            width={500}
            height={750}
            key={i}
          />
        ))}
      </div>
    </>
  )
}
