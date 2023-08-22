import Link from 'next/link'
import { gql } from 'urql'
import { usePath } from '~/hooks/path'
import { TVProps } from '~/types/props'
import { imageUrls } from '~/util/image-urls'
import { useTVQuery } from './query'

const gqlQuery = gql`
  query ($id: String!) {
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

export default function Seasons({ id }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id })
  const seasons = res.data?.tv?.seasons

  const path = usePath()

  return (
    <>
      <div className='grid123'>
        {seasons?.map((x, i) => (
          <Link
            href={`${path}/season/${x.season_number}`}
            className='row h-[150px] rounded-xl bg-cover bg-center'
            style={{
              backgroundImage: `url('${imageUrls.w94h141}/${x.poster_path}')`,
            }}
            key={i}
          >
            <div className='col h-full w-full space-y-1 rounded-xl bg-black bg-opacity-50 p-4'>
              <div className='font-bold'>{x.name}</div>
              <div className='text-sm'>{x.episode_count} Episodes</div>
              <div className='text-sm'>{x.air_date}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
