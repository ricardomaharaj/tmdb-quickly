import { useState } from 'react'
import { gql, useQuery } from 'urql'

import { TV } from '~/types/tmdb'

const tvVideosQuery = gql`
  query TVVideos($id: ID!) {
    tv(id: $id) {
      videos {
        results {
          key
          name
          type
        }
      }
    }
  }
`

export function TVVideos(props: { id: string }) {
  const { id } = props

  const [filter, setFilter] = useState('')

  const [{ data }] = useQuery<{ tv: TV }>({
    query: tvVideosQuery,
    variables: { id },
  })

  let videos = data?.tv?.videos?.results
  const types: string[] = []

  videos?.forEach((x) => {
    if (x?.type) {
      if (types.indexOf(x.type) === -1) types.push(x.type)
    }
  })

  if (filter) videos = videos?.filter((x) => x?.type === filter)

  return (
    <>
      <div className='row space-x-4 overflow-scroll'>
        {types.map((x, i) => (
          <button
            className={`${filter === x && 'font-bold'}`}
            onClick={() => setFilter(filter === x ? '' : x)}
            key={i}
          >
            {x}
          </button>
        ))}
      </div>
      <div className='grid234'>
        {videos?.map((x, i) => (
          <div className='col' key={i}>
            <a
              href={`https://www.youtube.com/watch?v=${x?.key}`}
              target='_blank'
              className='row'
            >
              <img
                src={`https://i.ytimg.com/vi/${x?.key}/hqdefault.jpg`}
                alt=''
              />
            </a>
            <div className='row my-1'>
              <div>
                {x?.name} | {x?.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
