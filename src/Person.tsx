import { Link, useParams } from 'react-router-dom'
import { usePersonQuery } from './gql'
import { toDateString } from './util'
import { IMG_URLs, LOAD_SILHOUETTE, Props } from './consts'

export function Person({ state, updateState }: Props) {
    let { id } = useParams()
    let [res] = usePersonQuery({ id })
    let { data, fetching, error } = res
    let person = data?.person

    document.title = `${person?.name} | TMDB Quickly`

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
        let prefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'Lt', 'Vol']
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

    let cast = person?.combined_credits?.cast
        ?.filter((x) => {
            let type = state.personCastTab === 'SHOWS' ? 'tv' : 'movie'
            if (x.media_type === type) return true
            return false
        })
        ?.filter(
            (x) =>
                (x.title || x.name)
                    ?.toLowerCase()
                    .includes(state.personQuery.toLowerCase()) ||
                x.character
                    ?.toLowerCase()
                    .includes(state.personQuery.toLowerCase())
        )
        .sort((a, b) =>
            (a.release_date || a.first_air_date)! >
            (b.release_date || b.first_air_date)!
                ? -1
                : 1
        )
        .slice(
            state.personPage === 1 ? 0 : state.personPage * 9,
            state.personPage === 1 ? 9 : state.personPage * 9 + 9
        )

    let crew = person?.combined_credits?.crew
        ?.filter(
            (x) =>
                (x.title || x.name)
                    ?.toLowerCase()
                    .includes(state.personQuery.toLowerCase()) ||
                x.job?.toLowerCase().includes(state.personQuery.toLowerCase())
        )
        .sort((a, b) =>
            (a.release_date || a.first_air_date)! >
            (b.release_date || b.first_air_date)!
                ? -1
                : 1
        )
        ?.slice(
            state.personPage === 1 ? 0 : state.personPage * 9,
            state.personPage === 1 ? 9 : state.personPage * 9 + 9
        )

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
                            state.personTab === x
                                ? 'bg-slate-700'
                                : 'bg-slate-800'
                        } rounded-xl p-2 hover:bg-slate-600`}
                        onClick={() =>
                            updateState({ personTab: x, personPage: 1 })
                        }
                        key={i}
                    >
                        {x}
                    </button>
                ))}
            </div>
            {state.personTab === 'BIO' && (
                <>
                    {person?.biography && (
                        <div className='bg-slate-800 rounded-xl p-3 space-y-2'>
                            {bioSplitter(person.biography)}
                        </div>
                    )}
                </>
            )}
            {state.personTab === 'CAST' && (
                <>
                    <div className='flex flex-row'>
                        <input
                            type='text'
                            className='bg-slate-800 rounded-xl p-2 w-full outline-none'
                            defaultValue={state.personQuery}
                            placeholder='Search Cast'
                            onChange={(e) =>
                                updateState({
                                    personQuery: e.currentTarget.value,
                                    personPage: 1
                                })
                            }
                        />
                    </div>
                    <div className='flex flex-row space-x-2'>
                        {['MOVIES', 'SHOWS'].map((x, i) => (
                            <button
                                className={`${
                                    state.personCastTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() => {
                                    updateState({
                                        personCastTab: x,
                                        personPage: 1
                                    })
                                }}
                                key={i}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
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
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.personPage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.personPage <= 1}
                            onClick={() =>
                                updateState({
                                    personPage: state.personPage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.personPage}</div>
                        <button
                            className={`${
                                cast?.length! < 9
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2`}
                            disabled={cast?.length! < 9}
                            onClick={() =>
                                updateState({
                                    personPage: state.personPage + 1
                                })
                            }
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
            {state.personTab === 'CREW' && (
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {person?.combined_credits?.crew?.map((x, i) => (
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
                                            className='w-[94px] h-[141px] brightness-50'
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
                                    <div className='text-sm'>
                                        {(
                                            x.release_date || x.first_air_date
                                        )?.substring(0, 4)}
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
            )}
            {state.personTab === 'IMAGES' && (
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
