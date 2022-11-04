import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Crew } from '../../interfaces/Movie'

type Props = {
    person: Crew
}
function CrewCard({ person }: Props) {
    const { id, profile_path, name, job } = person
    return (
        <>
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
                    <div className='bg-slate-900 rounded-xl mr-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='w-[94px] h-[141px] brightness-50'
                            viewBox='0 0 16 16'
                        >
                            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
                        </svg>
                    </div>
                )}
                <div>
                    {name && <div>{name}</div>}
                    {job && <div className='text-slate-400'>{job}</div>}
                </div>
            </Link>
        </>
    )
}

export default CrewCard
