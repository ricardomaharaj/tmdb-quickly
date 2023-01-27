import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { removeVoiceTag, runtimeCalc, setTitle, toDateString } from '../../util'
import { imageUrls, loadSilhouette } from '../../consts'
import { useMovieQuery } from '../../gql'
import { Card } from '../../comps/card'

const RELEASE_TYPES = [
    '',
    'Premiere',
    'Theatrical (limited)',
    'Theatrical',
    'Digital',
    'Physical',
    'TV'
]

enum Tabs {
    Info = 'INFO',
    Cast = 'CAST',
    Crew = 'CREW',
    Images = 'IMAGES',
    Videos = 'VIDEOS'
}

enum ImageTabs {
    Posters = 'POSTERS',
    Backdrops = 'BACKDROPS'
}

export function Movie() {
    const [imageTab, setImageTab] = useState('POSTERS')
    const [params, setParams] = useSearchParams()

    const tab = params.get('tab') || Tabs.Info
    const query = params.get('query') || ''
    const page = parseInt(params.get('page') || '1')

    const replaceSearchParams = (update: any) =>
        setParams({ tab, query, page, ...update }, { replace: true })

    const { id } = useParams()
    const [res] = useMovieQuery({ id })
    const { data, fetching, error } = res
    const movie = data?.movie

    setTitle(movie?.title)

    const releaseDates = movie?.release_dates?.results?.filter(
        (x) => x?.iso_3166_1 === 'US'
    )[0]?.release_dates

    const firstPage = page === 1

    const perPage = 9
    const startPage = (page - 1) * perPage
    const endPage = page * perPage

    const cast = movie?.credits?.cast
        ?.filter((x) => {
            const name = x.name?.toLowerCase()
            const character = x.character?.toLowerCase()
            const q = query.toLowerCase()
            if (name?.includes(q)) return true
            if (character?.includes(q)) return true
            return false
        })
        .slice(startPage, endPage)

    const crew = movie?.credits?.crew
        ?.filter((x) => {
            const name = x.name?.toLowerCase()
            const job = x.job?.toLowerCase()
            const q = query.toLowerCase()
            if (name?.includes(q)) return true
            if (job?.includes(q)) return true
            return false
        })
        .slice(startPage, endPage)

    if (fetching) return loadSilhouette

    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${imageUrls.W500}${movie?.backdrop_path})`
                }}
            >
                <div className='p-2 xl:p-10 backdrop-brightness-50 rounded-xl row'>
                    <img
                        src={`${imageUrls.W150H225}/${movie?.poster_path}`}
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
                            <div className='font-bold'>{movie.title}</div>
                        )}
                        {movie?.tagline && (
                            <div className='text-sm'>{movie.tagline}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='row space-x-2 overflow-scroll md:overflow-hidden'>
                {Object.values(Tabs).map((x, i) => (
                    <button
                        className={`${
                            tab === x ? 'bg-slate-700' : 'bg-slate-800'
                        } rounded-xl p-2 hover:bg-slate-600`}
                        onClick={() => replaceSearchParams({ tab: x, page: 1 })}
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {tab === Tabs.Info && (
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
                    <div className='row space-x-2 overflow-scroll md:overflow-hidden'>
                        {movie?.genres?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='row space-x-2 overflow-scroll md:overflow-hidden'>
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
                    <div className='row space-x-2 overflow-scroll md:overflow-hidden'>
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
            {[Tabs.Cast, Tabs.Crew].includes(tab as Tabs) && (
                <>
                    <input
                        type='text'
                        className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                        defaultValue={query}
                        placeholder='Search'
                        onChange={(e) =>
                            replaceSearchParams({
                                query: e.currentTarget.value,
                                page: 1
                            })
                        }
                    />
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {tab === Tabs.Cast &&
                            cast?.map((x, i) => (
                                <Card
                                    image={x.profile_path}
                                    primary={x.name}
                                    secondary={removeVoiceTag(x.character!)}
                                    variant='person'
                                    href={`/person/${x.id}`}
                                    key={i}
                                />
                            ))}
                        {tab === Tabs.Crew &&
                            crew?.map((x, i) => (
                                <Card
                                    image={x.profile_path}
                                    primary={x.name}
                                    secondary={x.job}
                                    variant='person'
                                    href={`/person/${x.id}`}
                                    key={i}
                                />
                            ))}
                    </div>
                    <div className='row space-x-2'>
                        <button
                            className={`${
                                firstPage
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={firstPage}
                            onClick={() =>
                                replaceSearchParams({ page: page - 1 })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{page}</div>
                        <button
                            className='bg-slate-800 hover:bg-slate-600 rounded-xl p-2'
                            onClick={() =>
                                replaceSearchParams({ page: page + 1 })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {tab === Tabs.Images && (
                <>
                    <div className='row space-x-2'>
                        {Object.values(ImageTabs).map((x, i) => (
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
                    {imageTab === ImageTabs.Posters && (
                        <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                            {movie?.images?.posters
                                ?.filter(
                                    ({ iso_639_1 }) =>
                                        iso_639_1 === 'en' || !iso_639_1
                                )
                                ?.map((x, i) => (
                                    <a
                                        href={`${imageUrls.ORIGINAL}${x.file_path}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={i}
                                    >
                                        <img
                                            src={`${imageUrls.W500}${x.file_path}`}
                                            loading='lazy'
                                            alt=''
                                        />
                                    </a>
                                ))}
                        </div>
                    )}
                    {imageTab === ImageTabs.Backdrops && (
                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                            {movie?.images?.backdrops
                                ?.filter(
                                    ({ iso_639_1 }) =>
                                        iso_639_1 === 'en' || !iso_639_1
                                )
                                ?.map((x, i) => (
                                    <a
                                        href={`${imageUrls.ORIGINAL}${x.file_path}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        key={i}
                                    >
                                        <img
                                            src={`${imageUrls.W500}${x.file_path}`}
                                            loading='lazy'
                                            alt=''
                                        />
                                    </a>
                                ))}
                        </div>
                    )}
                </>
            )}
            {tab === Tabs.Videos && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {movie?.videos?.results?.map((x, i) => (
                        <div
                            className='col bg-slate-800 rounded-xl hover:bg-slate-700'
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
                                <div className='col m-2'>
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
