import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Result } from '../../interfaces/Search'
import { FillerImage } from '../FillerImage'

type Props = {
    person: Result
}
export function PersonCard({ person }: Props) {
    const { id, profile_path, name } = person
    return (
        <Link
            to={`/person/${id}`}
            className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
        >
            {profile_path ? (
                <img
                    src={`${IMG_URLs.W94H141}${profile_path}`}
                    className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                    width='94'
                    height='141'
                    loading='lazy'
                    alt=''
                />
            ) : (
                <FillerImage variant='person' />
            )}
            <div>{name && <div>{name}</div>}</div>
        </Link>
    )
}
