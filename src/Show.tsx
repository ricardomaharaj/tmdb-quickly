import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { removeVoiceTag, runtimeCalc, setTitle, toDateString } from './util'
import { imageUrls, loadSilhouette } from './consts'
import { useShowQuery } from './gql'
import { Card } from './components/Card'

enum Tabs {
    Info = 'INFO',
    Cast = 'CAST',
    Crew = 'CREW',
    Seasons = 'SEASONS',
    Images = 'IMAGES',
    Videos = 'VIDEOS'
}

enum ImageTabs {
    Posters = 'POSTERS',
    Backdrops = 'BACKDROPS'
}

export function Show() {
    const [imageTab, setImageTab] = useState('POSTERS')
    const [params, setParams] = useSearchParams()

    const tab = params.get('tab') || Tabs.Info
    const query = params.get('query') || ''
    const page = parseInt(params.get('page') || '1')

    const replaceSearchParams = (update: any) =>
        setParams({ tab, query, page, ...update }, { replace: true })

    const { id } = useParams()
    const [res] = useShowQuery({ id })
    const { data, fetching, error } = res
    let show = data?.show

    setTitle(show?.name)

    const startYear = show?.first_air_date?.substring(0, 4)
    const endYear = show?.last_air_date?.substring(0, 4)
    const showOver = show?.status === 'Ended' || show?.status === 'Canceled'

    const firstPage = page === 1

    const perPage = 9
    const startPage = (page - 1) * perPage
    const endPage = page * perPage

    const cast = show?.aggregate_credits?.cast
        ?.filter((x) => {
            const q = query.toLowerCase()

            // forEach does not work in this case
            for (let i = 0; i < x?.roles?.length!; i++) {
                const character = x?.roles?.[i]?.character?.toLowerCase()
                if (character?.includes(q)) return true
            }

            const name = x?.name?.toLowerCase()
            if (name?.includes(q)) return true

            return false
        })
        ?.slice(startPage, endPage)

    const crew = show?.aggregate_credits?.crew
        ?.filter((x) => {
            const q = query.toLowerCase()

            // forEach does not work in this case
            for (let i = 0; i < x?.jobs?.length!; i++) {
                const job = x?.jobs?.[i]?.job?.toLowerCase()
                if (job?.includes(q)) return true
            }

            const name = x?.name?.toLowerCase()
            if (name?.includes(q)) return true

            return false
        })
        ?.slice(startPage, endPage)

    if (fetching) return loadSilhouette
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div
                className='bg-cover bg-center rounded-xl'
                style={{
                    backgroundImage: `url(${imageUrls.W500}${show?.backdrop_path})`
                }}
            >
                <div className='flex flex-row p-2 xl:p-10 rounded-xl backdrop-brightness-50'>
                    {show?.poster_path && (
                        <img
                            src={`${imageUrls.W150H225}${show.poster_path}`}
                            className='rounded-xl mr-2 max-w-[150px] max-h-[225px]'
                            width='150'
                            height='225'
                            alt=''
                        />
                    )}
                    <div className='space-y-1'>
                        <div>
                            {startYear && <span>{startYear}</span>}
                            {endYear && (
                                <>
                                    {showOver && startYear !== endYear && (
                                        <span>{` - ${endYear}`}</span>
                                    )}
                                </>
                            )}
                            {show?.status === 'Returning Series' && (
                                <span>{' - '}</span>
                            )}
                        </div>
                        {show?.name && (
                            <div className='font-semibold'>{show.name}</div>
                        )}
                        {show?.tagline && (
                            <div className='text-sm'>{show?.tagline}</div>
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
                        onClick={() => replaceSearchParams({ tab: x, page: 1 })}
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {tab === Tabs.Info && (
                <>
                    {show?.overview && (
                        <div className='bg-slate-800 rounded-xl p-4'>
                            {show?.overview}
                        </div>
                    )}
                    <div className='bg-slate-800 rounded-xl p-4'>
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
                                <span>
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
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {show?.genres?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                        {show?.networks?.map((x, i) => (
                            <div
                                className='bg-slate-800 rounded-xl p-2 text-sm'
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                        {show?.production_companies?.map((x, i) => (
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
                                    secondary={x?.roles
                                        ?.map(
                                            (role) =>
                                                `${removeVoiceTag(
                                                    role.character!
                                                )} (${role.episode_count} Eps)`
                                        )
                                        .slice(0, 3)
                                        .join(' | ')}
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
                                    secondary={x.jobs
                                        ?.map(
                                            (job) =>
                                                `${job.job} (${job.episode_count} Eps)`
                                        )
                                        .slice(0, 3)
                                        .join(' | ')}
                                    variant='person'
                                    href={`/person/${x.id}`}
                                    key={i}
                                />
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
            {tab === Tabs.Seasons && (
                <>
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {show?.seasons &&
                            show?.seasons.map((x, i) => (
                                <Card
                                    image={x.poster_path}
                                    primary={x.name}
                                    secondary={`${x.episode_count} Episodes`}
                                    tertiary={
                                        x.air_date
                                            ? toDateString(x.air_date)
                                            : ''
                                    }
                                    variant='tv'
                                    href={`season/${x.season_number}`}
                                    key={i}
                                />
                            ))}
                    </div>
                </>
            )}
            {tab === Tabs.Images && (
                <>
                    <div className='flex flex-row space-x-2'>
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
                            {show?.images?.posters
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
                            {show?.images?.backdrops
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
                    {show?.videos?.results?.map((x, i) => (
                        <div
                            className='flex flex-col bg-slate-800 rounded-xl hover:bg-slate-700'
                            key={i}
                        >
                            <a
                                href={`https://www.youtube.com/watch?v=${x.key}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <img
                                    src={`https://i.ytimg.com/vi/${x.key}/hqdefault.jpg`}
                                    className='rounded-t-xl'
                                    loading='lazy'
                                    alt=''
                                />
                            </a>
                            <div className='flex flex-col m-2'>
                                <span>{x.name}</span>
                                {x.published_at && (
                                    <span className='text-slate-400'>
                                        {toDateString(x.published_at)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
