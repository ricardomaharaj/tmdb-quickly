import { useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { useSeasonQuery } from './gql'
import { EpisodeCard } from './components/season/EpisodeCard'

enum Tabs {
    Episodes = 'EPISODES',
    Images = 'IMAGES',
    Videos = 'VIDEOS'
}

export function Season() {
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || Tabs.Episodes

    let { id, season_number } = useParams()
    let [res] = useSeasonQuery({ id, season_number })
    let { data, fetching, error } = res
    let season = data?.season

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
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
                            <div>{toDateString(season.air_date)}</div>
                        )}
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
            {tab === Tabs.Episodes && (
                <>
                    <div className='flex flex-col space-y-2'>
                        {season?.episodes?.map((x, i) => (
                            <EpisodeCard episode={x} key={i} />
                        ))}
                    </div>
                </>
            )}
            {tab === Tabs.Images && (
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
            {tab === Tabs.Videos && (
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
