import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { useEpisodeQuery } from './types/Episode'

export function Episode() {
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || 'INFO'

    let { id, season_number, episode_number } = useParams()
    let [res] = useEpisodeQuery({ id, season_number, episode_number })
    let { data, fetching, error } = res
    let episode = data?.episode

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${episode?.still_path})`
                }}
            >
                <div className='flex flex-col bg-black bg-opacity-50 space-y-2 rounded-xl p-10 xl:p-20'>
                    <div>
                        {`
                    ${
                        episode?.season_number
                            ? 'S' + `${episode?.season_number}`.padStart(2, '0')
                            : ''
                    }
                    ${
                        episode?.episode_number
                            ? 'E' +
                              `${episode?.episode_number}`.padStart(2, '0')
                            : ''
                    }
                    `}
                    </div>
                    <div>{episode?.name ? episode?.name : ''}</div>
                    <div>
                        {episode?.air_date
                            ? toDateString(episode?.air_date)
                            : ''}
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {['INFO', 'GUESTS', 'CREW', 'IMAGES'].map((x, i) => (
                    <button
                        className={`${
                            tab === x ? 'bg-slate-700' : 'bg-slate-800'
                        } rounded-xl p-2 hover:bg-slate-600`}
                        onClick={() => setParams({ tab: x }, { replace: true })}
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {tab === 'INFO' && (
                <>
                    {episode?.overview && (
                        <div className='bg-slate-800 rounded-xl p-4'>
                            {episode.overview}
                        </div>
                    )}
                </>
            )}
            {tab === 'GUESTS' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {episode?.guest_stars?.map((x, i) => (
                        <Link
                            to={`/person/${x.id}`}
                            className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                            key={i}
                        >
                            {x.profile_path ? (
                                <img
                                    src={`${IMG_URLs.W94H141}${x.profile_path}`}
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
                                {x.name && <div>{x.name}</div>}
                                {x.character && (
                                    <div className='text-slate-400'>
                                        {x.character}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {tab === 'CREW' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {episode?.crew?.map((x, i) => (
                        <Link
                            to={`/person/${x.id}`}
                            className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                            key={i}
                        >
                            {x.profile_path ? (
                                <img
                                    src={`${IMG_URLs.W94H141}${x.profile_path}`}
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
                                {x.name && <div>{x.name}</div>}
                                {x.job && (
                                    <div className='text-slate-400'>
                                        {x.job}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {tab === 'IMAGES' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {episode?.images?.stills?.map((x, i) => (
                        <a
                            href={`${IMG_URLs.ORIGINAL}${x.file_path}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            key={i}
                        >
                            <img
                                src={`${IMG_URLs.W500}${x.file_path}`}
                                loading='lazy'
                                alt=''
                            />
                        </a>
                    ))}
                </div>
            )}
        </>
    )
}
