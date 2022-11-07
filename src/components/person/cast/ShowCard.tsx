import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../../consts'
import { Cast } from '../../../interfaces/Person'
import { removeVoiceTag, toDateString } from '../../../util'
import { FillerImage } from '../../FillerImage'

type Props = {
    show: Cast
}
export function ShowCard({ show }: Props) {
    const { id, poster_path, first_air_date, name, character } = show
    return (
        <Link
            to={`/tv/${id}`}
            className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
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
                {first_air_date && (
                    <div className='text-slate-400 text-sm'>
                        {toDateString(first_air_date)}
                    </div>
                )}
                {name && <div>{name}</div>}
                {character && (
                    <div className='text-slate-400'>
                        {removeVoiceTag(character)}
                    </div>
                )}
            </div>
        </Link>
    )
}
