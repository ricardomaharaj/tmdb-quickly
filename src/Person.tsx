import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE } from './consts'
import { usePersonQuery } from './gql'

export function Person() {
    let [params, setParams] = useSearchParams()

    let tab = params.get('tab') || 'BIO'
    let creditsTab = params.get('creditsTab') || 'MOVIES'
    let query = params.get('query') || ''
    let page = parseInt(params.get('page') || '1')

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

    let pageLimit = 9
    let startPage = (page - 1) * pageLimit
    let endPage = page * pageLimit

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

    let lastCast = cast?.length! < 9

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

    let lastCrew = cast?.length! < 9

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
                        onClick={() => setParams({ tab: x }, { replace: true })}
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
                                    setParams(
                                        { tab, creditsTab: x, query },
                                        { replace: true }
                                    )
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
                        {cast?.map((x, i) => (
                            <Link
                                to={`/${x.media_type}/${x.id}`}
                                className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                                key={i}
                            >
                                {x.poster_path ? (
                                    <img
                                        src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                        className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                        loading='lazy'
                                        width='94'
                                        height='141'
                                        alt=''
                                    />
                                ) : (
                                    <div className='bg-slate-800 rounded-xl mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='w-[94px] h-[141px] brightness-50 p-2'
                                            viewBox='0 0 16 16'
                                        >
                                            {x.media_type === 'tv' ? (
                                                <path d='M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z' />
                                            ) : (
                                                <path d='M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z' />
                                            )}
                                        </svg>
                                    </div>
                                )}
                                <div>
                                    {(x.release_date || x.first_air_date) && (
                                        <div className='text-slate-400'>
                                            {toDateString(
                                                (x.release_date ||
                                                    x.first_air_date)!
                                            )}
                                        </div>
                                    )}
                                    {(x.name || x.title) && (
                                        <div>{x.name || x.title}</div>
                                    )}
                                    {x.character && (
                                        <div className='text-slate-400'>
                                            {x.character.replaceAll(
                                                '(voice)',
                                                ''
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
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
                                setParams(
                                    {
                                        tab,
                                        creditsTab,
                                        page: (page - 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
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
                                setParams(
                                    {
                                        tab,
                                        creditsTab,
                                        page: (page + 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
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
                                    setParams(
                                        { tab, creditsTab: x, query },
                                        { replace: true }
                                    )
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
                            <Link
                                to={`/${x.media_type}/${x.id}`}
                                className='flex flex-row bg-slate-800 rounded-xl p-2 hover:bg-slate-700'
                                key={i}
                            >
                                {x.poster_path ? (
                                    <img
                                        src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                        className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                        loading='lazy'
                                        width='94'
                                        height='141'
                                        alt=''
                                    />
                                ) : (
                                    <div className='bg-slate-800 rounded-xl mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='w-[94px] h-[141px] brightness-50 p-2'
                                            viewBox='0 0 16 16'
                                        >
                                            {x.media_type === 'tv' ? (
                                                <path d='M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z' />
                                            ) : (
                                                <path d='M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z' />
                                            )}
                                        </svg>
                                    </div>
                                )}
                                <div>
                                    {(x.release_date || x.first_air_date) && (
                                        <div className='text-slate-400'>
                                            {toDateString(
                                                (x.release_date ||
                                                    x.first_air_date)!
                                            )}
                                        </div>
                                    )}
                                    {(x.name || x.title) && (
                                        <div>{x.name || x.title}</div>
                                    )}
                                    {x.job && (
                                        <div className='text-slate-400'>
                                            {x.job}
                                        </div>
                                    )}
                                </div>
                            </Link>
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
                                setParams(
                                    {
                                        tab,
                                        creditsTab,
                                        page: (page - 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
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
                                setParams(
                                    {
                                        tab,
                                        creditsTab,
                                        page: (page + 1).toString(),
                                        query
                                    },
                                    { replace: true }
                                )
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
