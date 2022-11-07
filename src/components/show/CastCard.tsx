import { Link } from 'react-router-dom'
import { IMG_URLs } from '../../consts'
import { Cast } from '../../interfaces/Show'
import { removeVoiceTag } from '../../util'
import { FillerImage } from '../FillerImage'

type Props = {
    cast: Cast
}
export function CastCard({ cast }: Props) {
    const { id, name, profile_path, roles } = cast
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
                {roles && (
                    <div className='text-slate-400'>
                        {roles
                            ?.sort((a, b) =>
                                a.episode_count! > b.episode_count! ? -1 : 1
                            )
                            .map((role, i) => {
                                if (i === 4) return <div key={i}>...</div>
                                if (i > 4) return
                                return (
                                    <div key={i}>
                                        {`${removeVoiceTag(role.character!)} (${
                                            role.episode_count
                                        } Eps)`}
                                    </div>
                                )
                            })}
                    </div>
                )}
            </div>
        </Link>
    )
}
