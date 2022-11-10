import { useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { useEpisodeQuery } from './gql'
import { GuestCard } from './components/episode/GuestCard'
import { CrewCard } from './components/episode/CrewCard'

enum Tabs {
    Info = 'INFO',
    Guests = 'GUESTS',
    Crew = 'CREW',
    Images = 'IMAGES'
}

export function Episode() {
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || Tabs.Info

    let { id, season_number, episode_number } = useParams()
    let [res] = useEpisodeQuery({ id, season_number, episode_number })
    let { data, fetching, error } = res
    let episode = data?.episode

    let generateEpisodeShorthand = (
        seasonNum?: number,
        episodeNum?: number
    ) => {
        let x = ''
        if (seasonNum) x += `S${seasonNum.toString().padStart(2, '0')}`
        if (episodeNum) x += `E${episodeNum.toString().padStart(2, '0')}`
        return x
    }

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
                        {generateEpisodeShorthand(
                            episode?.season_number,
                            episode?.episode_number
                        )}
                    </div>
                    <div>{episode?.name ? episode?.name : ''}</div>
                    <div>
                        {episode?.air_date && toDateString(episode.air_date)}
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {Object.values(Tabs).map((x, i) => (
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
            {tab === Tabs.Info && (
                <>
                    {episode?.overview && (
                        <div className='bg-slate-800 rounded-xl p-4'>
                            {episode.overview}
                        </div>
                    )}
                </>
            )}
            {tab === Tabs.Guests && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {episode?.guest_stars?.map((x, i) => (
                        <GuestCard guest={x} key={i} />
                    ))}
                </div>
            )}
            {tab === Tabs.Crew && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {episode?.crew?.map((x, i) => (
                        <CrewCard crew={x} key={i} />
                    ))}
                </div>
            )}
            {tab === Tabs.Images && (
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
