import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Episode } from '../../interfaces/Season'
import { runtimeCalc, toDateString } from '../../util'

type Props = {
    episode: Episode
}
export function EpisodeCard({ episode }: Props) {
    const { episode_number, still_path, name, air_date, runtime, overview } =
        episode

    let titleString = ''

    if (episode_number) titleString += episode_number
    if (name) titleString += ` | ${name}`
    if (air_date) titleString += ` | ${toDateString(air_date)}`
    if (runtime) titleString += ` | ${runtimeCalc(runtime)}`

    return (
        <Link
            to={`episode/${episode_number}`}
            className='bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
        >
            <div className='flex flex-col md:flex-row'>
                {still_path && (
                    <img
                        src={`${IMG_URLs.W227H127}${still_path}`}
                        className='rounded-xl mb-2 md:mb-0 md:mr-2 max-w-[227px] max-h-[127px]'
                        loading='lazy'
                        width='227'
                        height='127'
                        alt=''
                    />
                )}
                <div className='flex flex-col'>
                    <span>{titleString}</span>
                    {overview && (
                        <div className='text-slate-400'>{overview}</div>
                    )}
                </div>
            </div>
        </Link>
    )
}
