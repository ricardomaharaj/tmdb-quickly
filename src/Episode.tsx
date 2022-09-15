import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEpisodeQuery } from './gql'
import { toDateString, useSyncState } from './util'
import { IMG_URLs } from './consts'

export function Episode() {
    let [crewFilter, setCrewFilter] = useState('ALL')

    let [tab, setTab] = useSyncState({ key: 'episodeTab', initVal: 'INFO' })

    let { id, season_number, episode_number } = useParams()
    let [res] = useEpisodeQuery({ id, season_number, episode_number })
    let { data, fetching, error } = res
    let episode = data?.episode

    let crewFilterOpts: string[] = []
    episode?.crew?.forEach(({ job }) => {
        crewFilterOpts.push(job!)
    })
    crewFilterOpts.sort((a, b) => {
        return a > b ? 1 : -1
    })
    crewFilterOpts.splice(0, 0, 'ALL')

    const load_silhouette = (
        <>
            <div className='row bg2 rounded-xl w-full h-[150px]'>
                <div className='col m-2 space-y-2'>
                    <div className='bg3 rounded-xl p-2 w-[150px]'></div>
                    <div className='bg3 rounded-xl p-2 w-[100px]'></div>
                    <div className='bg3 rounded-xl p-2 w-[50px]'></div>
                </div>
            </div>
            <div className='scroll-row'>
                <div className='bg2 btn w-[60px] h-[32px]'></div>
                <div className='bg2 btn w-[60px] h-[32px]'></div>
                <div className='bg2 btn w-[60px] h-[32px]'></div>
                <div className='bg2 btn w-[60px] h-[32px]'></div>
                <div className='bg2 btn w-[60px] h-[32px]'></div>
            </div>
            <div className='bubble w-full h-[100px]'></div>
        </>
    )

    if (fetching) return load_silhouette
    if (error) return <div className='err'>{error.message}</div>
    return (
        <>
            <div
                className='bg-img'
                style={{
                    backgroundImage: `url(${IMG_URLs.W500}${episode?.still_path})`
                }}
            >
                <div className='col bg-black bg-opacity-50 space-y-2 rounded-xl p-10 xl:p-20'>
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
            <div className='scroll-row'>
                {['INFO', 'GUESTS', 'CREW', 'IMAGES'].map((x, i) => (
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
                    {episode?.overview && (
                        <div className='bubble'>{episode.overview}</div>
                    )}
                </>
            )}
            {tab === 'GUESTS' && (
                <div className='grid123'>
                    {episode?.guest_stars?.map((x, i) => (
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
                        {episode?.crew
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
            {tab === 'IMAGES' && (
                <>
                    <div className='grid123'>
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
                </>
            )}
        </>
    )
}
