import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { GuestStar } from '../../interfaces/Episode'
import { FillerImage } from '../FillerImage'

type Props = {
    guest: GuestStar
}
export function GuestCard({ guest }: Props) {
    const { id, profile_path, name, character } = guest
    return (
        <Link
            to={`/person/${id}`}
            className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
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
                {character && <div className='text-slate-400'>{character}</div>}
            </div>
        </Link>
    )
}
