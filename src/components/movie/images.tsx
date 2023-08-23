import { useState } from 'react'
import { gql } from 'urql'
import { ImageCard } from '~/components/reusable/image-card'
import { TabBar } from '~/components/reusable/tab-bar'
import { MovieProps } from '~/types/props'
import { useMovieQuery } from './query'

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

const tabs = ['Posters', 'Backdrops']

export default function Images({ id, page }: MovieProps) {
  const [res] = useMovieQuery(gqlQuery, { id, page })
  const images = res.data?.movie?.images

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
            <ImageCard path={x.file_path} key={i} />
          ))}
        </div>
      )}
      {curTab === 'Backdrops' && (
        <div className='grid123'>
          {images?.backdrops?.map((x, i) => (
            <ImageCard path={x.file_path} key={i} />
          ))}
        </div>
      )}
    </>
  )
}
