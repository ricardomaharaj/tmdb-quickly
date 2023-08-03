import Image from 'next/image'
import { useState } from 'react'
import { gql } from 'urql'
import { imageUrls } from '~/util/image-urls'
import { useMovieQuery } from './query'
import { MovieProps } from './z'

const gqlQuery = gql`
  query ($id: String!, $page: Int) {
    movie(id: $id, page: $page) {
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

const imageTabs = {
  Posters: 'Posters',
  Backdrops: 'Backdrops',
} as const

type ImageTab = (typeof imageTabs)[keyof typeof imageTabs]

export default function Images(props: MovieProps) {
  const { queries } = props
  const { id, page } = queries

  const [res] = useMovieQuery(gqlQuery, { id, page })
  const images = res.data?.movie?.images

  const [tab, setTab] = useState<ImageTab>('Posters')

  return (
    <>
      <div className='row mb-2 space-x-2'>
        {Object.values(imageTabs).map((x, i) => (
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
          {images?.backdrops?.map((x, i) => (
            <Image
              src={`${imageUrls.w500h282}${x.file_path}`}
              width={500}
              height={282}
              key={i}
              className='max-w-'
              alt=''
            />
          ))}
        </div>
      )}
    </>
  )
}
