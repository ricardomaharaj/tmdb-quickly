import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useShowQuery } from './gql'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE, Props } from './consts'

export function Show({ state, updateState }: Props) {
    let [imageTab, setImageTab] = useState('POSTERS')

    let { id } = useParams()
    let [res] = useShowQuery({ id })
    let { data, fetching, error } = res
    let show = data?.show

    document.title = `${show?.name} | TMDB Quickly`

    let startYear = show?.first_air_date?.substring(0, 4)
    let endYear = show?.last_air_date?.substring(0, 4)
    let showOver = show?.status === 'Ended' || show?.status === 'Canceled'

    let cast = show?.aggregate_credits?.cast
        ?.sort((a, b) =>
            a.total_episode_count! > b.total_episode_count! ? -1 : 1
        )
        ?.filter((x) => {
            for (let i = 0; i < x?.roles?.length!; i++) {
                if (
                    x?.roles?.[i]?.character
                        ?.toLowerCase()
                        .includes(state.showQuery.toLowerCase())
                ) {
                    return true
                }
            }

            if (x.name?.toLowerCase().includes(state.showQuery.toLowerCase())) {
                return true
            }

            return false
        })
        ?.slice(
            state.showPage === 1 ? 0 : state.showPage * 9,
            state.showPage === 1 ? 9 : state.showPage * 9 + 9
        )

    let crew = show?.aggregate_credits?.crew
        ?.sort((a, b) =>
            a.total_episode_count! > b.total_episode_count! ? -1 : 1
        )
        ?.filter((x) => {
            for (let i = 0; i < x?.jobs?.length!; i++) {
                if (
                    x?.jobs?.[i]?.job
                        ?.toLowerCase()
                        .includes(state.showQuery.toLowerCase())
                ) {
                    return true
                }
            }

            if (x.name?.toLowerCase().includes(state.showQuery.toLowerCase())) {
                return true
            }

            return false
        })
        ?.slice(
            state.showPage === 1 ? 0 : state.showPage * 9,
            state.showPage === 1 ? 9 : state.showPage * 9 + 9
        )

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${show?.backdrop_path})`
                }}
            >
                <div className='flex flex-row p-2 xl:p-10 rounded-xl backdrop-brightness-50'>
                    {show?.poster_path && (
                        <img
                            src={`${IMG_URLs.W150H225}${show.poster_path}`}
                            className='rounded-xl mr-2 max-w-[150px] max-h-[225px]'
                            width='150'
                            height='225'
                            alt=''
                        />
                    )}
                    <div className='space-y-1'>
                    <div>
                            {startYear && <span>{startYear}</span>}
                            {endYear && (
                                <>
                                    {showOver && startYear !== endYear && (
                                        <span>{` - ${endYear}`}</span>
                                    )}
                                </>
                            )}
                            {show?.status === 'Returning Series' && (
                                <span>{' - '}</span>
                            )}
                        </div>
                        {show?.name && (
                            <div className='font-semibold'>{show.name}</div>
                        )}
                        {show?.tagline && (
                            <div className='text-sm'>{show?.tagline}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {['INFO', 'CAST', 'CREW', 'SEASONS', 'IMAGES', 'VIDEOS'].map(
                    (x, i) => (
                        <button
                            className={`${
                                state.showTab === x
                                    ? 'bg-slate-700'
                                    : 'bg-slate-800'
                            } rounded-xl p-2 hover:bg-slate-600`}
                            onClick={() =>
                                updateState({ showTab: x, showPage: 1 })
                            }
                            key={i}
                        >
                            {x}
                        </button>
                    )
                )}
            </div>
            {state.showTab === 'INFO' && (
                <>
                    {show?.overview && (
                        <div className='bg-slate-800 rounded-xl p-4'>
                            {show?.overview}
                        </div>
                    )}
                    <div className='bg-slate-800 rounded-xl p-4'>
                        {show?.status && <div>{`Status: ${show.status}`}</div>}
                        {show?.type && <div>{`Show Type: ${show.type}`}</div>}
                        {show?.episode_run_time
                            ? show.episode_run_time[0] > 0 && (
                                  <div>
                                      {`Runtime: ${runtimeCalc(
                                          show.episode_run_time[0]
                                      )}`}
                                  </div>
                              )
                            : null}
                        {show?.number_of_seasons
                            ? show.number_of_seasons > 0 && (
                                  <div>{`Seasons: ${show?.number_of_seasons}`}</div>
                              )
                            : null}
                        {show?.number_of_episodes
                            ? show.number_of_episodes > 0 && (
                                  <div>
                                      {`Episodes: ${show?.number_of_episodes}`}
                                  </div>
                              )
                            : null}
                        {show?.external_ids?.imdb_id && (
                            <div>
                                <a
                                    href={`https://www.imdb.com/title/${show.external_ids.imdb_id}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='underline'
                                >
                                    IMDB
                                </a>
                                <span>
                                    {` ID: ${show.external_ids.imdb_id}`}
                                </span>
                            </div>
                        )}
                        <div>
                            <a
                                href={`https://www.themoviedb.org/tv/${show?.id}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='underline'
                            >
                                TMDB
                            </a>
                            <span>{` ID: ${id}`}</span>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {show?.genres?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {show?.networks?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2 text-sm'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                        {show?.production_companies?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2 text-sm'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {state.showTab === 'CAST' && (
                <>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                            defaultValue={state.showQuery}
                            placeholder='Search Cast'
                            onChange={(e) =>
                                updateState({
                                    showQuery: e.currentTarget.value,
                                    showPage: 1
                                })
                            }
                        />
                    </div>
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {cast?.map((x, i) => (
                        <Link
                            to={`/person/${x.id}`}
                                className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
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
                                    {x.roles && (
                                    <div className='text-slate-400'>
                                            {x.roles
                                                ?.sort((a, b) =>
                                                    a.episode_count! >
                                                    b.episode_count!
                                                        ? -1
                                                        : 1
                                                )
                                                .map((x, i) => {
                                                    if (i === 4)
                                                        return (
                                                            <div key={i}>
                                                                ...
                                                            </div>
                                                        )
                                                    if (i > 4) return
                                                    return (
                                                        <div key={i}>
                                                            {`${x.character?.replaceAll(
                                                                '(voice)',
                                                                ''
                                                            )} (${
                                                                x.episode_count
                                                            } Eps)`}
                                                        </div>
                                                    )
                                                })}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.showPage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.showPage <= 1}
                            onClick={() =>
                                updateState({
                                    showPage: state.showPage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.showPage}</div>
                        <button
                            className={`${
                                cast?.length! < 9
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={cast?.length! < 9}
                            onClick={() =>
                                updateState({
                                    showPage: state.showPage + 1
                                })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {state.showTab === 'CREW' && (
                <>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                            defaultValue={state.showQuery}
                            placeholder='Search Crew'
                            onChange={(e) =>
                                updateState({
                                    showQuery: e.currentTarget.value,
                                    showPage: 1
                                })
                            }
                        />
                    </div>
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {crew?.map((x, i) => (
                        <Link
                            to={`/person/${x.id}`}
                                className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
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
                                    {x.jobs && (
                                    <div className='text-slate-400'>
                                            {x.jobs
                                                ?.sort((a, b) =>
                                                    a.episode_count! >
                                                    b.episode_count!
                                                        ? -1
                                                        : 1
                                                )
                                                .map((x, i) => (
                                                    <div
                                                        key={i}
                                                    >{`${x.job} (${x.episode_count} Eps)`}</div>
                                                ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.showPage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.showPage <= 1}
                            onClick={() =>
                                updateState({
                                    showPage: state.showPage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.showPage}</div>
                        <button
                            className={`${
                                crew?.length! < 9
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={crew?.length! < 9}
                            onClick={() =>
                                updateState({
                                    showPage: state.showPage + 1
                                })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {state.showTab === 'SEASONS' && (
                <>
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {show?.seasons &&
                            show?.seasons.map((x, i) => (
                                <Link
                                    to={`season/${x.season_number}`}
                                    className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                                    key={i}
                                >
                                    {x.poster_path && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                            className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                            loading='lazy'
                                            width='94'
                                            height='141'
                                            alt=''
                                        />
                                    )}
                                    <div>
                                        {x.name && <div>{x.name}</div>}
                                        {x.episode_count && (
                                            <div className='text-slate-400'>
                                                {`${x.episode_count} Episodes`}
                                            </div>
                                        )}
                                        {x.air_date && (
                                            <div className='text-slate-400'>
                                                {toDateString(x.air_date)}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </>
            )}
            {state.showTab === 'IMAGES' && (
                <>
                    <div className='flex flex-row space-x-2'>
                        {['POSTERS', 'BACKDROPS'].map((x, i) => (
                            <button
                                className={`${
                                    imageTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() => setImageTab(x)}
                                key={i}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
                    {imageTab === 'POSTERS' && (
                        <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                            {show?.images?.posters
                                ?.filter(
                                    ({ iso_639_1 }) =>
                                        iso_639_1 === 'en' || !iso_639_1
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
                    {imageTab === 'BACKDROPS' && (
                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                            {show?.images?.backdrops
                                ?.filter(
                                    ({ iso_639_1 }) =>
                                        iso_639_1 === 'en' || !iso_639_1
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
                </>
            )}
            {state.showTab === 'VIDEOS' && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {show?.videos?.results?.map((x, i) => (
                        <div
                            className='flex flex-col bg-slate-800 rounded-xl hover:bg-slate-700'
                            key={i}
                        >
                            <a
                                href={`https://www.youtube.com/watch?v=${x.key}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <img
                                    src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
                                    className='rounded-t-xl'
                                    loading='lazy'
                                    alt=''
                                />
                            </a>
                            <div className='flex flex-col m-2'>
                                <span>{x.name}</span>
                                {x.published_at && (
                                    <span className='text-slate-400'>
                                        {toDateString(x.published_at)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
