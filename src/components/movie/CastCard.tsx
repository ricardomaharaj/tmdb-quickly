import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Cast } from '../../interfaces/Movie'

type Props = {
    person: Cast
}
function CastCard({ person }: Props) {
    const { id, profile_path, name, character } = person
    return (
        <>
            <Link
                to={`/person/${id}`}
                className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
            >
                {profile_path && (
                    <img
                        src={`${IMG_URLs.W94H141}${profile_path}`}
                        className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                        width='94'
                        height='141'
                        loading='lazy'
                        alt=''
                    />
                )}
                <div>
                    {name && <div>{name}</div>}
                    {character && (
                        <div className='text-slate-400'>{character}</div>
                    )}
                </div>
            </Link>
        </>
    )
}

export default CastCard
