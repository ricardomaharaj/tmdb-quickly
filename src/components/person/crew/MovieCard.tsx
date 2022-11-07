import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../../consts'
import { Crew } from '../../../interfaces/Person'
import { toDateString } from '../../../util'
import { FillerImage } from '../../FillerImage'

type Props = {
    movie: Crew
}
export function MovieCard({ movie }: Props) {
    const { id, poster_path, release_date, title, job } = movie
    return (
        <Link
            to={`/movie/${id}`}
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
                <FillerImage variant='movie' />
            )}
            <div>
                {release_date && (
                    <div className='text-slate-400 text-sm'>
                        {toDateString(release_date)}
                    </div>
                )}
                {title && <div>{title}</div>}
                {job && <div className='text-slate-400'>{job}</div>}
            </div>
        </Link>
    )
}
