import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Result } from '../../interfaces/Search'
import { grabYear, overviewTrimmer } from '../../util'
import { FillerImage } from '../FillerImage'

type Props = {
    movie: Result
}
export function MovieCard({ movie }: Props) {
    const { id, poster_path, release_date, title, overview } = movie
    return (
        <Link
            to={`/movie/${id}`}
            className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
        >
            {poster_path ? (
                <img
                    src={`${IMG_URLs.W94H141}${poster_path}`}
                    className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                    width='94'
                    height='141'
                    loading='lazy'
                    alt=''
                />
            ) : (
                <FillerImage variant='movie' />
            )}
            <div>
                {release_date && (
                    <div className='text-sm'>{grabYear(release_date)}</div>
                )}
                {title && <div>{title}</div>}
                {overview && (
                    <div className='text-slate-400'>
                        {overviewTrimmer(overview)}
                    </div>
                )}
            </div>
        </Link>
    )
}
