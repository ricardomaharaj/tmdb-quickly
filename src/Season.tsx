import { Link, useParams } from 'react-router-dom'
import { useSeasonQuery } from './gql'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE, Props } from './consts'

export function Season({ state, updateState }: Props) {
    let { id, season_number } = useParams()
    let [res] = useSeasonQuery({ id, season_number })
    let { data, fetching, error } = res
    let season = data?.season

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-800 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${season?.poster_path})`
                }}
            >
                <div className='flex flex-row p-2 xl:p-10 rounded-xl backdrop-brightness-50'>
                    {season?.poster_path && (
                        <img
                            src={`${IMG_URLs.W150H225}${season.poster_path}`}
                            className='rounded-xl mr-2 max-w-[150px] max-h-[225px]'
                            width='150'
                            height='225'
                            alt=''
                        />
                    )}
                    <div className='flex flex-col space-y-1'>
                        {season?.name && <div>{season.name}</div>}
                        {season?.episodes?.length && (
                            <div>{`${season.episodes.length} Episodes`}</div>
                        )}
                        {season?.air_date && (
                            <div>{`${toDateString(season.air_date)}`}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {['EPISODES', 'CAST', 'CREW', 'IMAGES', 'VIDEOS'].map(
                    (x, i) => (
                        <button
                            className={`${
                                state.seasonTab === x
                                    ? 'bg-slate-700'
                                    : 'bg-slate-800'
                            } rounded-xl p-2 hover:bg-slate-600`}
                            onClick={() => updateState({ seasonTab: x })}
                            key={i}
                        >
                            {x}
                        </button>
                    )
                )}
            </div>
            {state.seasonTab === 'EPISODES' && (
                <>
                    <div className='flex flex-col space-y-2'>
                        {season?.episodes?.map((x, i) => (
                            <Link
                                to={`/tv/${id}/season/${season_number}/episode/${x.episode_number}`}
                                className='bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                                key={i}
                            >
                                <div className='flex flex-col md:flex-row'>
                                    {x.still_path && (
                                        <img
                                            src={`${IMG_URLs.W227H127}${x.still_path}`}
                                            className='rounded-xl mb-2 md:mb-0 md:mr-2 max-w-[227px] max-h-[127px]'
                                            loading='lazy'
                                            width='227'
                                            height='127'
                                            alt=''
                                        />
                                    )}
                                    <div className='flex flex-col'>
                                        <span>
                                            {`
                                            ${
                                                x.episode_number
                                                    ? x.episode_number
                                                    : ''
                                            }
                                            ${x.name ? ' | ' + x.name : ''}
                                            ${
                                                x.air_date
                                                    ? ' | ' +
                                                      toDateString(x.air_date)
                                                    : ''
                                            }
                                            ${
                                                x.runtime
                                                    ? ' | ' +
                                                      runtimeCalc(x.runtime)
                                                    : ''
                                            }
                                        `}
                                        </span>
                                        {x.overview && (
                                            <div className='text-slate-400'>
                                                {x.overview}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            {state.seasonTab === 'CAST' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {season?.credits?.cast?.map((x, i) => (
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
            {state.seasonTab === 'CREW' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {season?.credits?.crew?.map((x, i) => (
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
            {state.seasonTab === 'IMAGES' && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {season?.images?.posters
                        ?.filter(
                            ({ iso_639_1 }) => iso_639_1 === 'en' || !iso_639_1
                        )
                        ?.map((x, i) => (
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
            {state.seasonTab === 'VIDEOS' && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {season?.videos?.results?.map((x, i) => (
                        <div
                            className='flex flex-col bg-slate-800 rounded-xl hover:bg-slate-700'
                            key={i}
                        >
                            <a
                                target='_blank'
                                rel='noopener noreferrer'
                                href={`https://www.youtube.com/watch?v=${x.key}`}
                            >
                                <img
                                    src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
                                    className='rounded-t-xl'
                                    loading='lazy'
                                    alt=''
                                />
                            </a>
                            <div className='flex flex-col m-2'>
                                <div>{x.name}</div>
                                <div className='text-slate-400'>
                                    {toDateString(x.published_at!)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
