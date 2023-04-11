import { useState } from 'react'
import { gql, useQuery } from 'urql'

import { imageUrls } from '~/consts'
import { TV } from '~/types/tmdb'

const tvImagesQuery = gql`
  query TVImages($id: ID!) {
    tv(id: $id) {
      images {
        backdrops {
          file_path
          iso_639_1
        }
        posters {
          file_path
          iso_639_1
        }
      }
    }
  }
`

enum Tabs {
  Posters = 'Posters',
  Backdrops = 'Backdrops',
}

export function TVImages({ id }: { id: string }) {
  const [tab, setTab] = useState<Tabs>(Tabs.Posters)

  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvImagesQuery,
    variables: { id },
  })
  const posters = data?.tv?.images?.posters?.filter(
    (x) => x?.iso_639_1 === 'en' || !x?.iso_639_1,
  )
  const backdrops = data?.tv?.images?.backdrops?.filter(
    (x) => x?.iso_639_1 === 'en' || !x?.iso_639_1,
  )

  return (
    <>
      <div className='row space-x-4'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'font-bold'}`}
            onClick={() => setTab(x)}
            key={i}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === Tabs.Posters && (
        <>
          <div className='grid234'>
            {posters?.map((x, i) => (
              <a
                href={`${imageUrls.original}${x?.file_path}`}
                target='_blank'
                key={i}
              >
                <img
                  src={`${imageUrls.w500}${x?.file_path}`}
                  loading='lazy'
                  alt=''
                />
              </a>
            ))}
          </div>
        </>
      )}
      {tab === Tabs.Backdrops && (
        <>
          <div className='grid123'>
            {backdrops?.map((x, i) => (
              <a
                href={`${imageUrls.original}${x?.file_path}`}
                target='_blank'
                key={i}
              >
                <img
                  src={`${imageUrls.w500}${x?.file_path}`}
                  loading='lazy'
                  alt=''
                />
              </a>
            ))}
          </div>
        </>
      )}
    </>
  )
}
