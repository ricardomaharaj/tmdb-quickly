import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Season } from '../../interfaces/Show'
import { toDateString } from '../../util'
import { FillerImage } from '../FillerImage'

type Props = {
    season: Season
}
export function SeasonCard({ season }: Props) {
    const { air_date, episode_count, name, poster_path, season_number } = season
    return (
        <Link
            to={`season/${season_number}`}
            className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
        >
            {poster_path ? (
                <img
                    src={`${IMG_URLs.W94H141}${poster_path}`}
                    className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                    loading='lazy'
                    width='94'
                    height='141'
                    alt=''
                />
            ) : (
                <FillerImage variant='tv' />
            )}
            <div>
                {name && <div>{name}</div>}
                {episode_count && (
                    <div className='text-slate-400'>
                        {`${episode_count} Episodes`}
                    </div>
                )}
                {air_date && (
                    <div className='text-slate-400'>
                        {toDateString(air_date)}
                    </div>
                )}
            </div>
        </Link>
    )
}
