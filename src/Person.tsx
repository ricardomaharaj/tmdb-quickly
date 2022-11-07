import { useParams, useSearchParams } from 'react-router-dom'
import { setTitle, toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { usePersonQuery } from './gql'
import { CastCard } from './components/person/CastCard'
import { CrewCard } from './components/person/CrewCard'

export function Person() {
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || 'BIO'
    let creditsTab = params.get('creditsTab') || 'MOVIES'
    let query = params.get('query') || ''
    let page = parseInt(params.get('page') || '1')

    let replaceSearchParams = (update: any) =>
        setParams(
            { tab, creditsTab, query, page, ...update },
            { replace: true }
        )

    let { id } = useParams()
    let [res] = usePersonQuery({ id: id! })
    let { data, fetching, error } = res
    let person = data?.person

    setTitle(person?.name)

    let calculateAge = (birthday: string, deathday?: string) => {
        let age: number = 0
        let start: Date = new Date(birthday.replace('-', '/'))
        let end: Date = new Date()
        if (deathday) end = new Date(deathday.replace('-', '/'))
        age = end.getFullYear() - start.getFullYear()
        return age
    }

    /** divide bio by sentence for easy reading */
    let bioSplitter = (bio: string) => {
        // add newline every period
        bio = bio.replaceAll('. ', '.\n')

        // remove newline where inappropriate
        let prefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'Jr', 'Lt', 'Vol']
        prefixes.forEach((prefix) => {
            bio = bio.replaceAll(`${prefix}\.\n`, `${prefix}\.\ `)
        })

        return (
            <>
                {bio.split('\n').map((x, i) => (
                    <div key={i}>{x}</div>
                ))}
            </>
        )
    }

    let creditsFilter = creditsTab === 'SHOWS' ? 'tv' : 'movie'

    let firstPage = page === 1

    let perPage = 9
    let startPage = (page - 1) * perPage
    let endPage = page * perPage

    let cast = person?.combined_credits?.cast
        ?.filter((x) => x.media_type === creditsFilter)
        .filter((x) => {
            let q = query.toLowerCase()
            let media = (x.name || x.title)?.toLowerCase()
            let character = x.character?.toLowerCase()
            if (media?.includes(q)) return true
            if (character?.includes(q)) return true
            return false
        })
        ?.sort((a, b) =>
            (a.release_date || a.first_air_date)! >
            (b.release_date || b.first_air_date)!
                ? -1
                : 1
        )
        .slice(startPage, endPage)

    let lastCast = cast?.length! < perPage

    let crew = person?.combined_credits?.crew
        ?.filter((x) => x.media_type === creditsFilter)
        .filter((x) => {
            let q = query.toLowerCase()
            let media = (x.name || x.title)?.toLowerCase()
            let job = x.job?.toLowerCase()
            if (media?.includes(q)) return true
            if (job?.includes(q)) return true
            return false
        })
        ?.sort((a, b) =>
            (a.release_date || a.first_air_date)! >
            (b.release_date || b.first_air_date)!
                ? -1
                : 1
        )
        .slice(startPage, endPage)

    let lastCrew = crew?.length! < perPage

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div className='flex flex-row bg-slate-800 rounded-xl p-2'>
                {person?.profile_path && (
                    <img
                        src={`${IMG_URLs.W150H225}${person?.profile_path}`}
                        className='rounded-xl mr-2 max-w-[150px] max-h-[225px]'
                        width='150'
                        height='225'
                        alt=''
                    />
                )}
                <div className='flex flex-col space-y-1'>
                    <div>{person?.name}</div>
                    {person?.birthday && (
                        <div>{`Born: ${toDateString(person.birthday)}`}</div>
                    )}
                    {person?.deathday && (
                        <div>{`Died: ${toDateString(person.deathday)}`}</div>
                    )}
                    {person?.birthday &&
                        !isNaN(
                            calculateAge(person.birthday, person.deathday)
                        ) && (
                            <div>
                                {`Age: ${calculateAge(
                                    person.birthday,
                                    person.deathday
                                )}`}
                            </div>
                        )}
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {['BIO', 'CAST', 'CREW', 'IMAGES'].map((x, i) => (
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
            {tab === 'BIO' && (
                <>
                    {person?.biography && (
                        <div className='bg-slate-800 rounded-xl p-3 space-y-2'>
                            {bioSplitter(person.biography)}
                        </div>
                    )}
                </>
            )}
            {tab === 'CAST' && (
                <>
                    <div className='flex flex-row space-x-2'>
                        {['MOVIES', 'SHOWS'].map((x, i) => (
                            <button
                                className={`${
                                    creditsTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() =>
                                    replaceSearchParams({ creditsTab: x })
                                }
                                key={i}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
                    <input
                        type='text'
                        className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                        placeholder='Search Cast Credits'
                        defaultValue={query}
                        onChange={(e) =>
                            replaceSearchParams({
                                query: e.currentTarget.value
                            })
                        }
                    />
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {cast?.map((x, i) => (
                            <CastCard cast={x} key={i} />
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
                            className={`${
                                lastCast
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={lastCast}
                            onClick={() =>
                                replaceSearchParams({ page: page + 1 })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {tab === 'CREW' && (
                <>
                    <div className='flex flex-row space-x-2'>
                        {['MOVIES', 'SHOWS'].map((x, i) => (
                            <button
                                className={`${
                                    creditsTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() =>
                                    replaceSearchParams({ creditsTab: x })
                                }
                                key={i}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
                    <input
                        type='text'
                        className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                        placeholder='Search Crew Credits'
                        defaultValue={query}
                        onChange={(e) =>
                            setParams(
                                {
                                    tab,
                                    creditsTab,
                                    query: e.currentTarget.value
                                },
                                { replace: true }
                            )
                        }
                    />
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {crew?.map((x, i) => (
                            <CrewCard crew={x} key={i} />
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
                            className={`${
                                lastCrew
                                    ? 'text-slate-400'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={lastCrew}
                            onClick={() =>
                                replaceSearchParams({ page: page + 1 })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {tab === 'IMAGES' && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {person?.images?.profiles?.map((x, i) => (
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
