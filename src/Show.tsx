import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useShowQuery } from './gql'
import { runtimeCalc, toDateString, useSyncState } from './util'
import { IMG_URLs } from './consts'
import { Stars } from './Stars'

export function Show() {
    let [imageTab, setImageTab] = useState('POSTERS')
    let [crewFilter, setCrewFilter] = useState('ALL')
    let [videoFilter, setVideoFilter] = useState('ALL')

    let [tab, setTab] = useSyncState({ key: 'showTab', initVal: 'INFO' })

    let { id } = useParams()
    let [res] = useShowQuery({ id })
    let { data, fetching, error } = res
    let show = data?.show

    document.title = `${show?.name} | TMDB Quickly`

    let crewFilterOpts: string[] = []
    let videoFilterOpts: string[] = []

    show?.credits?.crew?.forEach(({ job }) => {
        if (crewFilterOpts.findIndex((x) => x === job) === -1)
            crewFilterOpts.push(job!)
    })
    show?.videos?.results?.forEach(({ type }) => {
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
            <div className='scroll-row'>
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
                <div className='bg2 p-2 w-[80px] h-[32px] rounded-xl' />
            </div>
            <div className='bg2 p-2 w-full h-[200px] rounded-xl' />
            <div className='bg2 p-2 w-full h-[200px] rounded-xl' />
            <div className='scroll-row'>
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
                    backgroundImage: `url(${IMG_URLs.W500}${show?.backdrop_path})`
                }}
            >
                <div className='dark-card'>
                    {show?.poster_path && (
                        <img
                            src={`${IMG_URLs.W150H225}${show.poster_path}`}
                            className='dark-card-img w150-h225'
                            width='150'
                            height='225'
                            alt=''
                        />
                    )}
                    <div className='dark-card-text'>
                        {show?.first_air_date && (
                            <div>{toDateString(show.first_air_date)}</div>
                        )}
                        {show?.name && (
                            <div
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        show?.name?.replaceAll(' ', '.') +
                                            '.' +
                                            show?.first_air_date?.substring(
                                                0,
                                                4
                                            )
                                    )
                                }
                            >
                                {show.name}
                            </div>
                        )}
                        {show?.tagline && (
                            <div className='text-sm'>{show?.tagline}</div>
                        )}
                        {show?.vote_average
                            ? show.vote_average > 0 && (
                                  <Stars average={show.vote_average} />
                              )
                            : null}
                    </div>
                </div>
            </div>
            <div className='scroll-row'>
                {['INFO', 'CAST', 'CREW', 'SEASONS', 'IMAGES', 'VIDEOS'].map(
                    (x, i) => (
                        <div
                            className={`btn ${tab === x ? 'bg3' : 'bg2'}`}
                            onClick={() => setTab(x)}
                            key={i}
                        >
                            {x}
                        </div>
                    )
                )}
            </div>
            {tab === 'INFO' && (
                <>
                    {show?.overview && (
                        <div className='bubble'>{show?.overview}</div>
                    )}
                    <div className='bubble'>
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
                                <span
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            show?.external_ids?.imdb_id!
                                        )
                                    }
                                >
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
                    <div className='scroll-row'>
                        {show?.genres?.map((x, i) => (
                            <div className='meta-bubble' key={i}>
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='scroll-row'>
                        {show?.networks?.map((x, i) => (
                            <div className='meta-bubble' key={i}>
                                {x.name}
                            </div>
                        ))}
                        {show?.production_companies?.map((x, i) => (
                            <div className='meta-bubble text-sm' key={i}>
                                {x.name}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {tab === 'CAST' && (
                <div className='grid123'>
                    {show?.credits?.cast?.map((x, i) => (
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
                        {show?.credits?.crew
                            ?.filter(({ job }) => {
                                if (crewFilter === 'ALL') return true
                                if (job === crewFilter) return true
                                else return false
                            })
                            ?.map((x, i) => (
                                <Link
                                    to={`/person/${x.id}`}
                                    className='card'
                                    key={i}
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
            {tab === 'SEASONS' && (
                <>
                    <div className='grid123'>
                        {show?.seasons &&
                            show?.seasons.map((x, i) => (
                                <Link
                                    to={`/tv/${id}/season/${x.season_number}`}
                                    className='card'
                                    key={i}
                                >
                                    {x.poster_path && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                            className='card-img w94-h141'
                                            loading='lazy'
                                            width='94'
                                            height='141'
                                            alt=''
                                        />
                                    )}
                                    <div className='card-text'>
                                        {x.name && <div>{x.name}</div>}
                                        {x.episode_count && (
                                            <div className='subtext'>
                                                {`${x.episode_count} Episodes`}
                                            </div>
                                        )}
                                        {x.air_date && (
                                            <div className='subtext'>
                                                {toDateString(x.air_date)}
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
                        <div className='grid123'>
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
                        {show?.videos?.results
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
                                        href={`https://www.youtube.com/watch?v=${x.key}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <img
                                            src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
                                            className='vid-card-img'
                                            loading='lazy'
                                            alt=''
                                        />
                                    </a>
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
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    )
}
