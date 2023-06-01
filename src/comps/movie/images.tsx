import Image from 'next/image'
import { useState } from 'react'
import { gql, useQuery } from 'urql'
import { ID } from '~/types/id'
import { Movie } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $page: Int) {
    movie(id: $id, page: $page) {
      images {
        posters {
          file_path
          iso_639_1
        }
        backdrops {
          file_path
          iso_639_1
        }
      }
    }
  }
`

type Data = { movie?: Movie }
type Vars = {
  id: ID
  page: number
}
function useImagesQuery(variables: Vars) {
  return useQuery<Data, Vars>({ query, variables })
}

const tabs = {
  Posters: 'Posters',
  Backdrops: 'Backdrops',
} as const

type Tab = (typeof tabs)[keyof typeof tabs]

type Props = { queries: Queries }
export default function Images(props: Props) {
  const { queries } = props
  const { id, page } = queries

  const [tab, setTab] = useState<Tab>('Posters')
  const [res] = useImagesQuery({ id, page })
  const images = res.data?.movie?.images

  return (
    <>
      <div className='row mb-2 space-x-2'>
        {Object.values(tabs).map((x, i) => (
          <button
            onClick={() => setTab(x)}
            className='row border-2 px-2'
            key={i}
          >
            <div>{x}</div>
          </button>
        ))}
      </div>
      {tab === 'Posters' && (
        <div className='grid234 mb-2'>
          {images?.posters?.map((x, i) => (
            <Image
              src={`${imageUrls.w300h450}${x.file_path}`}
              width={300}
              height={450}
              key={i}
              alt=''
            />
          ))}
        </div>
      )}
      {tab === 'Backdrops' && (
        <div className='grid123 mb-2'>
          {images?.posters?.map((x, i) => (
            <Image
              src={`${imageUrls.w500h282}${x.file_path}`}
              width={500}
              height={282}
              key={i}
              alt=''
            />
          ))}
        </div>
      )}
    </>
  )
}
