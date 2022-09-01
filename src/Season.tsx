import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSeasonQuery } from './gql'
import { runtimeCalc, toDateString } from './util'
import { IMG_URLs, Props } from './consts'

export function Season({ state, updateState }: Props) {
    let [crewFilter, setCrewFilter] = useState('ALL')
    let [videoFilter, setVideoFilter] = useState('ALL')

    let { id, season_number } = useParams()
    let [res] = useSeasonQuery({ id, season_number })
    let { data, fetching, error } = res
    let season = data?.season

    let crewFilterOpts: string[] = []
    let videoFilterOpts: string[] = []

    season?.credits?.crew?.forEach(({ job }) => {
        if (crewFilterOpts.findIndex((x) => x === job) === -1)
            crewFilterOpts.push(job!)
    })
    season?.videos?.results?.forEach(({ type }) => {
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
            <div className='row bg2 p-1 w-full rounded-xl'>
                <div className='bg3 w-[150px] m-1 h-[225px] rounded-xl' />
                <div className='col m-1 space-y-2'>
                    <div className='bg3 p-2 rounded-xl w-[150px]' />
                    <div className='bg3 p-2 rounded-xl w-[100px]' />
                    <div className='bg3 p-2 rounded-xl w-[50px]' />
                </div>
            </div>
            <div className='scroll-row'>
                <div className='btn bg2 p-2 w-[80px] h-[32px]' />
                <div className='btn bg2 p-2 w-[80px] h-[32px]' />
                <div className='btn bg2 p-2 w-[80px] h-[32px]' />
                <div className='btn bg2 p-2 w-[80px] h-[32px]' />
                <div className='btn bg2 p-2 w-[80px] h-[32px]' />
            </div>
            <div className='col space-y-2'>
                <div className='bubble w-full h-[150px]' />
                <div className='bubble w-full h-[150px]' />
                <div className='bubble w-full h-[150px]' />
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
                    backgroundImage: `url(${IMG_URLs.W500}${season?.poster_path})`
                }}
            >
                <div className='dark-card'>
                    {season?.poster_path && (
                        <img
                            src={`${IMG_URLs.W150H225}${season.poster_path}`}
                            className='dark-card-img w150-h225'
                            width='150'
                            height='225'
                            alt=''
                        />
                    )}
                    <div className='dark-card-text'>
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
            <div className='scroll-row'>
                {['EPISODES', 'CAST', 'CREW', 'IMAGES', 'VIDEOS'].map(
                    (x, i) => (
                        <div
                            className={`btn ${
                                state.seasonTab === x ? 'bg3' : 'bg2'
                            }`}
                            onClick={() => updateState({ seasonTab: x })}
                            key={i}
                        >
                            {x}
                        </div>
                    )
                )}
            </div>
            {state.seasonTab === 'EPISODES' && (
                <>
                    <div className='col space-y-2'>
                        {season?.episodes?.map((x, i) => (
                            <Link
                                to={`/tv/${id}/season/${season_number}/episode/${x.episode_number}`}
                                className='card'
                                key={i}
                            >
                                <div className='col md:flex-row'>
                                    {x.still_path && (
                                        <img
                                            src={`${IMG_URLs.W227H127}${x.still_path}`}
                                            className='card-img w227-h127'
                                            loading='lazy'
                                            width='227'
                                            height='127'
                                            alt=''
                                        />
                                    )}
                                    <div className='col m-1'>
                                        <span>{`
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
                                                ? ' | ' + runtimeCalc(x.runtime)
                                                : ''
                                        }
                                        ${
                                            x.vote_average
                                                ? ' | ' + x.vote_average
                                                : ''
                                        }
                                        `}</span>
                                        {x.overview && (
                                            <div className='subtext mt-1'>
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
                <div className='grid123'>
                    {season?.credits?.cast?.map((x, i) => (
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
            {state.seasonTab === 'CREW' && (
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
                        {season?.credits?.crew
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
            {state.seasonTab === 'IMAGES' && (
                <div className='grid234'>
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
                <>
                    <div className='single-row'>
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
                        {season?.videos?.results
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
                                    </a>
                                    <div className='vid-card-text'>
                                        {`${x.name ? x.name + ' | ' : ''}${
                                            x.published_at
                                                ? toDateString(x.published_at) +
                                                  ' | '
                                                : ''
                                        }`}
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    )
}
