import Image from 'next/image'
import { useState } from 'react'
import { gql, useQuery } from 'urql'
import { ID } from '~/types/id'
import { TV } from '~/types/tmdb'
import { imageUrls } from '~/util/image-urls'
import { Queries } from './types'

const query = gql`
  query ($id: ID!, $page: Int) {
    tv(id: $id, page: $page) {
      images {
        posters {
          file_path
        }
        backdrops {
          file_path
        }
      }
    }
  }
`

type Data = { tv?: TV }
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

type Tabs = (typeof tabs)[keyof typeof tabs]

type Props = { queries: Queries }
export default function Images(props: Props) {
  const { queries } = props
  const { id, page } = queries

  const [res] = useImagesQuery({ id, page })
  const images = res.data?.tv?.images

  const [tab, setTab] = useState<Tabs>('Posters')

  return (
    <>
      <div className='row mb-2 space-x-2'>
        {Object.values(tabs).map((x, i) => (
          <button className='border-2 px-2' onClick={() => setTab(x)} key={i}>
            {x}
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
              alt=''
              key={i}
            />
          ))}
        </div>
      )}
      {tab === 'Backdrops' && (
        <div className='grid123 mb-2'>
          {images?.backdrops?.map((x, i) => (
            <Image
              src={`${imageUrls.w500h282}${x.file_path}`}
              width={500}
              height={282}
              alt=''
              key={i}
            />
          ))}
        </div>
      )}
    </>
  )
}
