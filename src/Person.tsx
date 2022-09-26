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

    let castMovies = person?.combined_credits?.cast
        ?.filter((x) => x.media_type === 'movie')

        .sort((a, b) => (a.release_date! > b.release_date! ? -1 : 1))
        .slice(
            state.personCastPage === 1 ? 0 : state.personCastPage * 9,
            state.personCastPage === 1 ? 9 : state.personCastPage * 9 + 9
        )

    let castShows = person?.combined_credits?.cast
        ?.filter((x) => x.media_type === 'tv')

        .sort((a, b) => (a.first_air_date! > b.first_air_date! ? -1 : 1))
        .slice(
            state.personCastPage === 1 ? 0 : state.personCastPage * 9,
            state.personCastPage === 1 ? 9 : state.personCastPage * 9 + 9
        )

    let cast = state.personCastTab === 'MOVIES' ? castMovies : castShows

    if (fetching) return LOAD_SILHOUETTE
    if (error)
        return <div className='bg-red-800 rounded-xl p-4'>{error.message}</div>
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
                        onClick={() => updateState({ personTab: x })}
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
                    <div className='flex flex-row space-x-2'>
                        {['MOVIES', 'SHOWS'].map((x, i) => (
                            <button
                                className={`${
                                    state.personCastTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() => {
                                    updateState({ personCastTab: x })
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
                                {x.poster_path && (
                                    <img
                                        src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                        className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                        loading='lazy'
                                        width='94'
                                        height='141'
                                        alt=''
                                    />
                                )}
                                <div>
                                    {(x.release_date || x.first_air_date) && (
                                        <div className='text-slate-400'>
                                            {toDateString(
                                                x.release_date! ||
                                                    x.first_air_date!
                                            )}
                                        </div>
                                    )}
                                    {(x.name || x.title) && (
                                        <div>{x.name || x.title}</div>
                                    )}
                                    {x.character && (
                                        <div className='text-slate-400'>
                                            {x.character}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-row space-x-2 overflow-scroll xl:overflow-hidden'>
                        <button
                            className={`${
                                state.personCastPage <= 1
                                    ? 'text-slate-600'
                                    : 'bg-slate-800 hover:bg-slate-600'
                            } rounded-xl p-2 `}
                            disabled={state.personCastPage <= 1}
                            onClick={() =>
                                updateState({
                                    personCastPage: state.personCastPage - 1
                                })
                            }
                        >
                            BACK
                        </button>
                        <div className='p-2'>{state.personCastPage}</div>
                        <button
                            className='bg-slate-800 rounded-xl p-2 hover:bg-slate-600'
                            onClick={() =>
                                updateState({
                                    personCastPage: state.personCastPage + 1
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
                            {x.poster_path && (
                                <img
                                    src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                    className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                    loading='lazy'
                                    width='94'
                                    height='141'
                                    alt=''
                                />
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
