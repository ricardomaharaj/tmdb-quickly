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
    <Link to={`episode/${episode_number}`} className='col link md:row'>
      {still_path && (
        <>
          <img
            src={`${imageUrls.W640H360}${still_path}`}
            className='mb-2 rounded-xl md:mr-2 md:hidden'
            width={640}
            height={360}
            alt=''
          />
          <img
            src={`${imageUrls.W227H127}${still_path}`}
            className='hidden max-h-[127px] max-w-[227px] rounded-xl md:mr-2 md:block'
            width={227}
            height={127}
            alt=''
          />
        </>
      )}

      <div className='col space-y-1'>
        <div className='row scroll-hide subtext space-x-2'>
          {air_date && <div>{toDateString(air_date)}</div>}
          {runtime && <div>{runtimeCalc(runtime)}</div>}
        </div>

        <div className='row scroll-hide space-x-2'>
          {episode_number && <div>{episode_number}</div>}
          {name && <div>{name}</div>}
        </div>

        {overview && <div className='subtext'>{overviewTrimmer(overview)}</div>}
      </div>
    </Link>
  )
}
