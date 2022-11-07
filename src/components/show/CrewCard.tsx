import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Crew } from '../../interfaces/Show'
import { FillerImage } from '../FillerImage'

type Props = {
    crew: Crew
}
export function CrewCard({ crew }: Props) {
    const { id, name, jobs, profile_path } = crew
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
                {jobs && (
                    <div className='text-slate-400'>
                        {jobs
                            ?.sort((a, b) =>
                                a.episode_count! > b.episode_count! ? -1 : 1
                            )
                            .map((job, i) => (
                                <div
                                    key={i}
                                >{`${job.job} (${job.episode_count} Eps)`}</div>
                            ))}
                    </div>
                )}
            </div>
        </Link>
    )
}
