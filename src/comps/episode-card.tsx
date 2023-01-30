import { Link } from 'react-router-dom'
import { imageUrls } from '../consts'
import { overviewTrimmer, runtimeCalc, toDateString } from '../util'

type Props = {
  episode: {
    episode_number?: number
    still_path?: string
    name?: string
    air_date?: string
    runtime?: number
    overview?: string
  }
}

export function EpisodeCard(props: Props) {
  const { episode } = props
  const { episode_number, still_path, name, air_date, runtime, overview } =
    episode

  return (
    <Link to={`episode/${episode_number}`} className='col md:row'>
      {still_path && (
        <>
          <img
            src={`${imageUrls.W640H360}${still_path}`}
            className='rounded-xl mb-2 md:mr-2 md:hidden'
            width={640}
            height={360}
            alt=''
          />
          <img
            src={`${imageUrls.W227H127}${still_path}`}
            className='max-w-[227px] max-h-[127px] rounded-xl md:mr-2 hidden md:block'
            width={227}
            height={127}
            alt=''
          />
        </>
      )}

      <div className='col space-y-1'>
        <div className='scroll-row subtext'>
          {air_date && <div>{toDateString(air_date)}</div>}
          {runtime && <div>{runtimeCalc(runtime)}</div>}
        </div>

        <div className='scroll-row'>
          {episode_number && <div>{episode_number}</div>}
          {name && <div>{name}</div>}
        </div>

        {overview && <div className='subtext'>{overviewTrimmer(overview)}</div>}
      </div>
    </Link>
  )
}
