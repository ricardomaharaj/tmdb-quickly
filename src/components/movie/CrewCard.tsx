import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Crew } from '../../interfaces/Movie'
import { FillerImage } from '../FillerImage'

type Props = {
    person: Crew
}
export function CrewCard({ person }: Props) {
    const { id, profile_path, name, job } = person
    return (
        <Link
            to={`/person/${id}`}
            className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
        >
            {profile_path ? (
                <img
                    src={`${IMG_URLs.W94H141}${profile_path}`}
                    className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                    loading='lazy'
                    width='94'
                    height='141'
                    alt=''
                />
            ) : (
                <FillerImage variant='person' />
            )}
            <div>
                {name && <div>{name}</div>}
                {job && <div className='text-slate-400'>{job}</div>}
            </div>
        </Link>
    )
}
