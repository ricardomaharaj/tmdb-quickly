import Image from 'next/image'
import { useState } from 'react'
import { gql } from 'urql'
import { TabBar } from '~/components/reusable/tab-bar'
import { TVProps } from '~/types/props'
import { imageUrls } from '~/util/image-urls'
import { useTVQuery } from './query'

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

const tabs = ['Posters', 'Backdrops']

export default function Images({ id, page }: TVProps) {
  const [res] = useTVQuery(gqlQuery, { id, page })
  const images = res.data?.tv?.images

  const [curTab, setTab] = useState('Posters')

  return (
    <>
      <TabBar
        tabs={tabs}
        currentTab={curTab}
        onTabClicked={(tab) => setTab(tab)}
        className='mt-0'
      />
      {curTab === 'Posters' && (
        <div className='grid234'>
          {images?.posters?.map((x, i) => (
            <Image
              src={`${imageUrls.w500}${x.file_path}`}
              width={500}
              height={0}
              alt=''
              key={i}
            />
          ))}
        </div>
      )}
      {curTab === 'Backdrops' && (
        <div className='grid123'>
          {images?.backdrops?.map((x, i) => (
            <Image
              src={`${imageUrls.w500}${x.file_path}`}
              width={500}
              height={0}
              alt=''
              key={i}
            />
          ))}
        </div>
      )}
    </>
  )
}
