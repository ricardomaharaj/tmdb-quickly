import { Movie } from '~/types/tmdb'
import { releaseTypes } from './types'

export default function Info(props: { movie?: Movie }) {
  const { movie } = props

  const release_dates = movie?.release_dates?.results
    ?.filter((x) => x.iso_3166_1 === 'US')
    ?.at(0)?.release_dates

  return (
    <>
      <div className='row mb-2'>
        <div>{movie?.overview}</div>
      </div>
      <div className='row mb-2 space-x-4 overflow-scroll'>
        {movie?.production_companies?.map((x, i) => (
          <div className='whitespace-nowrap text-sm' key={i}>
            {x.name}
          </div>
        ))}
      </div>
      <div className='row space-x-4 overflow-scroll'>
        {release_dates?.map((x, i) => (
          <div key={i} className='col whitespace-nowrap text-sm'>
            {x.type && <div>{releaseTypes[x.type]}</div>}
            {x.release_date && (
              <div key={i}>
                {new Date(x.release_date).toDateString().substring(4)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
