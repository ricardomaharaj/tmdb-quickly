import Image from 'next/image'
import { useState } from 'react'
import { gql } from 'urql'
import { TVProps } from '~/types/props'
import { imageUrls } from '~/util/image-urls'
import { useTVQuery } from './query'

const imageTabs = {
  Posters: 'Posters',
  Backdrops: 'Backdrops',
} as const

type ImageTab = (typeof imageTabs)[keyof typeof imageTabs]

const gqlQuery = gql`
  query ($id: String!, $page: Int) {
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

export default function Images({ id, page }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id, page })
  const images = res.data?.tv?.images

  const [tab, setTab] = useState<ImageTab>('Posters')

  return (
    <>
      <div className='row mb-2 space-x-2'>
        {Object.values(imageTabs).map((x, i) => (
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
