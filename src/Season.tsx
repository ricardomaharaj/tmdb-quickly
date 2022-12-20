import { Link, useParams, useSearchParams } from 'react-router-dom'
import { runtimeCalc, toDateString } from './util'
import { imageUrls, loadSilhouette } from './consts'
import { useSeasonQuery } from './gql'

enum Tabs {
    Episodes = 'EPISODES',
    Images = 'IMAGES',
    Videos = 'VIDEOS'
}

export function Season() {
    const [params, setParams] = useSearchParams()

    const tab = params.get('tab') || Tabs.Episodes

    const replaceSearchParams = (update: any) =>
        setParams({ tab, ...update }, { replace: true })

    const { id, season_number } = useParams()
    const [res] = useSeasonQuery({ id, season_number })
    const { data, fetching, error } = res
    const season = data?.season

    const generateEpisodeHeader = (episode: {
        episode_number?: number
        name?: string
        air_date?: string
        runtime?: number
    }) => {
        const { episode_number, name, air_date, runtime } = episode
        let x = ''
        if (episode_number) x += `${episode_number}`
        if (name) x += ` | ${name}`
        if (air_date) x += ` | ${toDateString(air_date)}`
        if (runtime) x += ` | ${runtimeCalc(runtime)}`
        return x
    }

    if (fetching) return loadSilhouette
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${imageUrls.W500}${season?.poster_path})`
                }}
            >
                <div className='flex flex-row p-2 xl:p-10 rounded-xl backdrop-brightness-50'>
                    {season?.poster_path && (
                        <img
                            src={`${imageUrls.W150H225}${season.poster_path}`}
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
                        onClick={() => replaceSearchParams({ tab: x })}
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
                            <Link
                                className={`flex flex-col md:flex-row rounded-xl p-2 bg-slate-800 hover:bg-slate-700`}
                                to={`episode/${x.episode_number}`}
                                key={i}
                            >
                                {x.still_path && (
                                    <img
                                        src={imageUrls.W227H127 + x.still_path}
                                        className='rounded-xl mb-2 md:mb-0 md:mr-2 self-center max-w-[227px] max-h-[127px]'
                                        alt=''
                                    />
                                )}
                                <div className='flex flex-col'>
                                    <div className='text-center md:text-left'>
                                        {generateEpisodeHeader(x)}
                                    </div>
                                    <div className='text-center md:text-left text-slate-400'>
                                        {x.overview}
                                    </div>
                                </div>
                            </Link>
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
