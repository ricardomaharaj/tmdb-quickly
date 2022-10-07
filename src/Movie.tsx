import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMovieQuery } from './gql'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE, Props } from './consts'

const RELEASE_TYPES = [
    '',
    'Premiere',
    'Theatrical (limited)',
    'Theatrical',
    'Digital',
    'Physical',
    'TV'
]

export function Movie({ state, updateState }: Props) {
    let [imageTab, setImageTab] = useState('POSTERS')

    let { id } = useParams()
    let [res] = useMovieQuery({ id })
    let { data, fetching, error } = res
    let movie = data?.movie

    document.title = `${movie?.title} | TMDB Quickly`

    let releaseDates = movie?.release_dates?.results?.filter(
        (x) => x?.iso_3166_1 === 'US'
    )[0]?.release_dates

    let cast = movie?.credits?.cast
        ?.filter(
            (x) =>
                x.name
                    ?.toLowerCase()
                    .includes(state.movieQuery.toLowerCase()) ||
                x.character
                    ?.toLowerCase()
                    .includes(state.movieQuery.toLowerCase())
        )
        ?.slice(
            state.moviePage === 1 ? 0 : state.moviePage * 9,
            state.moviePage === 1 ? 9 : state.moviePage * 9 + 9
        )

    let crew = movie?.credits?.crew
        ?.filter(
            (x) =>
                x.name
                    ?.toLowerCase()
                    .includes(state.movieQuery.toLowerCase()) ||
                x.job?.toLowerCase().includes(state.movieQuery.toLowerCase())
        )
        ?.slice(
            state.moviePage === 1 ? 0 : state.moviePage * 9,
            state.moviePage === 1 ? 9 : state.moviePage * 9 + 9
        )

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
                    <div>
                        {movie?.title && (
                            <div className='font-bold mb-1'>{movie?.title}</div>
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
                            state.movieTab === x
                                ? 'bg-slate-700'
                                : 'bg-slate-800'
                        } rounded-xl p-2 hover:bg-slate-600`}
                        onClick={() => updateState({ movieTab: x })}
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {state.movieTab === 'INFO' && (
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
                                <span
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            movie?.imdb_id!
                                        )
                                    }
                                >
                                    {` ID: ${movie.imdb_id}`}
                                </span>
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
                    <div className='flex flex-row space-x-2'>
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
            {state.movieTab === 'CAST' && (
                <>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                            defaultValue={state.movieQuery}
                            placeholder='Search Cast'
                            onChange={(e) =>
                                updateState({
                                    movieQuery: e.currentTarget.value,
                                    moviePage: 1
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
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.moviePage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.moviePage <= 1}
                            onClick={() =>
                                updateState({
                                    moviePage: state.moviePage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.moviePage}</div>
                        <button
                            className={`${
                                cast?.length! < 9
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={cast?.length! < 9}
                            onClick={() =>
                                updateState({
                                    moviePage: state.moviePage + 1
                                })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {state.movieTab === 'CREW' && (
                <>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                            defaultValue={state.movieQuery}
                            placeholder='Search Crew'
                            onChange={(e) =>
                                updateState({
                                    movieQuery: e.currentTarget.value,
                                    moviePage: 1
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
                                    {x.job && (
                                        <div className='text-slate-400'>
                                            {x.job}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.moviePage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.moviePage <= 1}
                            onClick={() =>
                                updateState({
                                    moviePage: state.moviePage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.moviePage}</div>
                        <button
                            className={`${
                                crew?.length! < 9
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={crew?.length! < 9}
                            onClick={() =>
                                updateState({
                                    moviePage: state.moviePage + 1
                                })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {state.movieTab === 'IMAGES' && (
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
            {state.movieTab === 'VIDEOS' && (
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
