import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { useMovieQuery } from './types/Movie'

const RELEASE_TYPES = [
    '',
    'Premiere',
    'Theatrical (limited)',
    'Theatrical',
    'Digital',
    'Physical',
    'TV'
]

export function Movie() {
    let [imageTab, setImageTab] = useState('POSTERS')
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || 'INFO'
    let query = params.get('query') || ''
    let page = parseInt(params.get('page') || '1')

    let { id } = useParams()
    let [res] = useMovieQuery({ id: id! })
    let { data, fetching, error } = res
    let movie = data?.movie

    document.title = `${movie?.title} | TMDB Quickly`

    let releaseDates = movie?.release_dates?.results?.filter(
        (x) => x?.iso_3166_1 === 'US'
    )[0]?.release_dates

    let firstPage = page === 1

    let pageLimit = 9
    let startPage = (page - 1) * pageLimit
    let endPage = page * pageLimit

    let cast = movie?.credits?.cast
        ?.filter((x) => {
            let name = x.name?.toLowerCase()
            let character = x.character?.toLowerCase()
            let q = query.toLowerCase()
            if (name?.includes(q)) return true
            if (character?.includes(q)) return true
            return false
        })
        .slice(startPage, endPage)

    let lastCast = cast?.length! < 9

    let crew = movie?.credits?.crew
        ?.filter((x) => {
            let name = x.name?.toLowerCase()
            let job = x.job?.toLowerCase()
            let q = query.toLowerCase()
            if (name?.includes(q)) return true
            if (job?.includes(q)) return true
            return false
        })
        .slice(startPage, endPage)

    let lastCrew = crew?.length! < 9

    if (fetching) return LOAD_SILHOUETTE

    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${movie?.backdrop_path})`
                }}
            >
                <div className='p-2 xl:p-10 backdrop-brightness-50 rounded-xl flex flex-row'>
                    <img
                        src={`${IMG_URLs.W150H225}/${movie?.poster_path}`}
                        className='max-w-[150px] max-h-[225px] rounded-xl mr-2'
                        width='150'
                        height='225'
                        alt=''
                    />
                    <div className='space-y-1'>
                        {movie?.release_date && (
                            <div>{movie.release_date.substring(0, 4)}</div>
                        )}
                        {movie?.title && (
                            <div className='font-bold'>{movie?.title}</div>
                        )}
                        {movie?.tagline && (
                            <div className='text-sm'>{movie.tagline}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {['INFO', 'CAST', 'CREW', 'IMAGES', 'VIDEOS'].map((x, i) => (
                    <button
                        className={`${
                            tab === x ? 'bg-slate-700' : 'bg-slate-800'
                        } rounded-xl p-2 hover:bg-slate-600`}
                        onClick={() =>
                            setParams({ tab: x, query }, { replace: true })
                        }
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {tab === 'INFO' && (
                <>
                    {movie?.overview && (
                        <div className='bg-slate-800 rounded-xl p-4'>
                            {movie.overview}
                        </div>
                    )}
                    <div className='bg-slate-800 rounded-xl p-4'>
                        {movie?.status && <div>Status: {movie?.status}</div>}
                        {movie?.runtime
                            ? movie.runtime > 0 && (
                                  <div>
                                      {`Runtime: ${runtimeCalc(movie.runtime)}`}
                                  </div>
                              )
                            : null}
                        {movie?.budget
                            ? movie.budget > 0 && (
                                  <div>
                                      {`Budget: \$${movie.budget.toLocaleString()}`}
                                  </div>
                              )
                            : null}
                        {movie?.revenue
                            ? movie.revenue > 0 && (
                                  <div>
                                      {`Revenue: \$${movie.revenue.toLocaleString()}`}
                                  </div>
                              )
                            : null}
                        {movie?.budget && movie.revenue
                            ? movie.budget > 0 &&
                              movie.revenue > 0 && (
                                  <div>
                                      {`Earnings: \$${(
                                          movie.revenue - movie.budget
                                      ).toLocaleString()}`}
                                  </div>
                              )
                            : null}
                        {movie?.original_language && (
                            <div>
                                {`Original Language: ${movie?.original_language}`}
                            </div>
                        )}
                        {movie?.original_title && (
                            <div>{`Original Title: ${movie?.original_title}`}</div>
                        )}
                        {movie?.imdb_id && (
                            <div>
                                <a
                                    className='underline'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                >
                                    IMDB
                                </a>
                                <span>{` ID: ${movie.imdb_id}`}</span>
                            </div>
                        )}
                        <div>
                            <a
                                className='underline'
                                target='_blank'
                                rel='noopener noreferrer'
                                href={`https://www.themoviedb.org/movie/${movie?.id}`}
                            >
                                TMDB
                            </a>
                            <span>{` ID: ${id}`}</span>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {movie?.genres?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {releaseDates?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2 text-sm'
                                key={i}
                            >
                                {x.type && <div>{RELEASE_TYPES[x.type]}</div>}
                                {x.release_date && (
                                    <div>{toDateString(x.release_date)}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {movie?.production_companies?.map((x, i) => (
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
            {tab === 'CAST' && (
                <>
                    <input
                        type='text'
                        className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                        defaultValue={query}
                        placeholder='Search Cast'
                        onChange={(e) =>
                            setParams(
                                {
                                    tab: 'CAST',
                                    query: e.currentTarget.value
                                },
                                { replace: true }
                            )
                        }
                    />
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
                                    {x.character && (
                                        <div className='text-slate-400'>
                                            {x.character.replaceAll(
                                                '(voice)',
                                                ''
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <button
                            className={`${
                                firstPage
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={firstPage}
                            onClick={() =>
                                setParams(
                                    {
                                        tab: 'CAST',
                                        page: (page - 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{page}</div>
                        <button
                            className={`${
                                lastCast
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={lastCast}
                            onClick={() =>
                                setParams(
                                    {
                                        tab: 'CAST',
                                        page: (page + 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {tab === 'CREW' && (
                <>
                    <input
                        type='text'
                        className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                        defaultValue={query}
                        placeholder='Search Crew'
                        onChange={(e) =>
                            setParams(
                                { tab: 'CREW', query: e.currentTarget.value },
                                { replace: true }
                            )
                        }
                    />
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
                                    {x.job && (
                                        <div className='text-slate-400'>
                                            {x.job}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <button
                            className={`${
                                firstPage
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={firstPage}
                            onClick={() =>
                                setParams(
                                    {
                                        tab: 'CREW',
                                        page: (page - 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{page}</div>
                        <button
                            className={`${
                                lastCrew
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={lastCrew}
                            onClick={() =>
                                setParams(
                                    {
                                        tab: 'CREW',
                                        page: (page + 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {tab === 'IMAGES' && (
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
                            {movie?.images?.posters
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
                            {movie?.images?.backdrops
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
            {tab === 'VIDEOS' && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {movie?.videos?.results?.map((x, i) => (
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
                                <div className='flex flex-col m-2'>
                                    <span>{x.name}</span>
                                    {x.published_at && (
                                        <span className='text-slate-400'>
                                            {toDateString(x.published_at)}
                                        </span>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
