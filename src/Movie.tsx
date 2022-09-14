import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMovieQuery } from './gql'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs } from './consts'
import { Stars } from './Stars'

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
    let [crewFilter, setCrewFilter] = useState('ALL')
    let [videoFilter, setVideoFilter] = useState('ALL')

    let [tab, setTab] = useState(localStorage.getItem('movieTab') || 'INFO')

    useEffect(() => {
        localStorage.setItem('movieTab', tab)
    }, [tab])

    let { id } = useParams()
    let [res] = useMovieQuery({ id })
    let { data, fetching, error } = res
    let movie = data?.movie

    document.title = `${movie?.title} | TMDB Quickly`

    let releaseDates = movie?.release_dates?.results?.filter(
        (x) => x?.iso_3166_1 === 'US'
    )[0]?.release_dates

    let crewFilterOpts: string[] = []
    let videoFilterOpts: string[] = []

    movie?.credits?.crew?.forEach(({ job }) => {
        if (crewFilterOpts.findIndex((x) => x === job) === -1)
            crewFilterOpts.push(job!)
    })
    movie?.videos?.results?.forEach(({ type }) => {
        if (videoFilterOpts.findIndex((x) => x === type) === -1)
            videoFilterOpts.push(type!)
    })

    crewFilterOpts.sort((a, b) => {
        return a > b ? 1 : -1
    })
    crewFilterOpts.splice(0, 0, 'ALL')
    videoFilterOpts.splice(0, 0, 'ALL')

    const load_silhouette = (
        <>
            <div className='row bg2 rounded-xl xl:p-8'>
                <div className='bg3 rounded-xl w-[150px] h-[225px] m-2'></div>
                <div className='col space-y-2 ml-1 mt-2'>
                    <div className='bg3 w-[150px] p-2 rounded-xl' />
                    <div className='bg3 w-[100px] p-2 rounded-xl' />
                    <div className='bg3 w-[50px]  p-2 rounded-xl' />
                </div>
            </div>
            <div className='row space-x-2'>
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
            </div>
            <div className='bg2 p-2 w-full h-[200px] rounded-xl' />
            <div className='bg2 p-2 w-full h-[200px] rounded-xl' />
            <div className='row space-x-2'>
                <div className='bg2 p-2 w-[100px] h-[100px] rounded-xl'></div>
                <div className='bg2 p-2 w-[100px] h-[100px] rounded-xl'></div>
                <div className='bg2 p-2 w-[100px] h-[100px] rounded-xl'></div>
            </div>
        </>
    )

    if (fetching) return load_silhouette

    if (error) return <div className='err'>{error.message}</div>
    return (
        <>
            <div
                className='bg-img'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${movie?.backdrop_path})`
                }}
            >
                <div className='dark-card'>
                    <img
                        src={`${IMG_URLs.W150H225}/${movie?.poster_path}`}
                        className='dark-card-img w150-h225'
                        width='150'
                        height='225'
                        alt=''
                    />
                    <div className='dark-card-text'>
                        {movie?.release_date && (
                            <div>{toDateString(movie.release_date)}</div>
                        )}
                        {movie?.title && (
                            <div
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        movie?.title?.replaceAll(' ', '.') +
                                            '.' +
                                            movie?.release_date?.substring(0, 4)
                                    )
                                }
                            >
                                {movie?.title}
                            </div>
                        )}
                        {movie?.tagline && (
                            <div className='text-sm'>{movie.tagline}</div>
                        )}
                        {movie?.vote_average
                            ? movie.vote_average > 0 && (
                                  <Stars average={movie.vote_average} />
                              )
                            : null}
                    </div>
                </div>
            </div>
            <div className='scroll-row'>
                {['INFO', 'CAST', 'CREW', 'IMAGES', 'VIDEOS'].map((x, i) => (
                    <div
                        className={`btn ${tab === x ? 'bg3' : 'bg2'}`}
                        onClick={() => setTab(x)}
                        key={i}
                    >
                        {x}
                    </div>
                ))}
            </div>
            {tab === 'INFO' && (
                <>
                    {movie?.overview && (
                        <div className='bubble'>{movie.overview}</div>
                    )}
                    <div className='bubble'>
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
                    <div className='scroll-row'>
                        {movie?.genres?.map((x, i) => (
                            <div className='meta-bubble' key={i}>
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='scroll-row'>
                        {releaseDates?.map((x, i) => (
                            <div className='meta-bubble text-sm' key={i}>
                                {x.type && <div>{RELEASE_TYPES[x.type]}</div>}
                                {x.release_date && (
                                    <div>{toDateString(x.release_date)}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='scroll-row'>
                        {movie?.production_companies?.map((x, i) => (
                            <div className='meta-bubble text-sm' key={i}>
                                {x.name}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {tab === 'CAST' && (
                <div className='grid123'>
                    {movie?.credits?.cast?.map((x, i) => (
                        <Link to={`/person/${x.id}`} className='card' key={i}>
                            {x.profile_path && (
                                <img
                                    src={`${IMG_URLs.W94H141}${x.profile_path}`}
                                    className='card-img w94-h141'
                                    loading='lazy'
                                    width='94'
                                    height='141'
                                    alt=''
                                />
                            )}
                            <div className='card-text'>
                                {x.name && <div>{x.name}</div>}
                                {x.character && (
                                    <div className='subtext'>{x.character}</div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {tab === 'CREW' && (
                <>
                    <div className='row'>
                        <select
                            defaultValue={crewFilter}
                            onChange={(e) => setCrewFilter(e.target.value)}
                        >
                            {crewFilterOpts.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='grid123'>
                        {movie?.credits?.crew
                            ?.filter(({ job }) => {
                                if (crewFilter === 'ALL') return true
                                if (job === crewFilter) return true
                                else return false
                            })
                            ?.map((x, i) => (
                                <Link
                                    to={`/person/${x.id}`}
                                    key={i}
                                    className='card'
                                >
                                    {x.profile_path && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${x.profile_path}`}
                                            className='card-img w94-h141'
                                            loading='lazy'
                                            width='94'
                                            height='141'
                                            alt=''
                                        />
                                    )}
                                    <div className='card-text'>
                                        {x.name && <div>{x.name}</div>}
                                        {x.job && (
                                            <div className='subtext'>
                                                {x.job}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </>
            )}
            {tab === 'IMAGES' && (
                <>
                    <div className='btn-row'>
                        {['POSTERS', 'BACKDROPS'].map((x, i) => (
                            <div
                                className={`btn ${
                                    imageTab === x ? 'bg3' : 'bg2'
                                }`}
                                onClick={() => setImageTab(x)}
                                key={i}
                            >
                                {x}
                            </div>
                        ))}
                    </div>
                    {imageTab === 'POSTERS' && (
                        <div className='grid234'>
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
                        <div className='grid123'>
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
                <>
                    <div className='row'>
                        <select
                            defaultValue={videoFilter}
                            onChange={(e) => setVideoFilter(e.target.value)}
                        >
                            {videoFilterOpts.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='grid234'>
                        {movie?.videos?.results
                            ?.filter(({ type }) => {
                                if (videoFilter === 'ALL') return true
                                if (type === videoFilter) return true
                                else return false
                            })
                            ?.sort((a, b) =>
                                Date.parse(a.published_at!) >
                                Date.parse(b.published_at!)
                                    ? -1
                                    : 1
                            )
                            ?.map((x, i) => (
                                <div className='vid-card' key={i}>
                                    <a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={`https://www.youtube.com/watch?v=${x.key}`}
                                    >
                                        <img
                                            src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
                                            className='vid-card-img'
                                            loading='lazy'
                                            alt=''
                                        />
                                        <div className='vid-card-text'>
                                            <span>{x.name}</span>
                                            {x.published_at && (
                                                <span className='subtext'>
                                                    {` | ${toDateString(
                                                        x.published_at
                                                    )}`}
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    )
}
