import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePersonQuery } from './gql'
import { toDateString } from './util'
import { IMG_URLs, Props } from './consts'

export function Person({ state, updateState }: Props) {
    let [castFilter, setCastFilter] = useState('movie')

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

    const load_silhouette = (
        <>
            <div className='bg2 row w-full p-1 rounded-xl'>
                <div className='bg3 w-[150px] h-[225px] m-1 rounded-xl'></div>
                <div className='col m-1 space-y-2'>
                    <div className='bg3 rounded-xl p-2 w-[150px]'></div>
                    <div className='bg3 rounded-xl p-2 w-[100px]'></div>
                    <div className='bg3 rounded-xl p-2 w-[50px]'></div>
                </div>
            </div>
            <div className='scroll-row'>
                <div className='bg2 btn w-[80px] h-[32px]'></div>
                <div className='bg2 btn w-[80px] h-[32px]'></div>
                <div className='bg2 btn w-[80px] h-[32px]'></div>
                <div className='bg2 btn w-[80px] h-[32px]'></div>
                <div className='bg2 btn w-[80px] h-[32px]'></div>
            </div>
            <div className='bubble w-full h-[200px] '></div>
        </>
    )

    if (fetching) return load_silhouette
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
                        {[
                            { name: 'MOVIES', val: 'movie' },
                            { name: 'SHOWS', val: 'tv' }
                        ].map((x, i) => (
                            <button
                                className={`${
                                    castFilter === x.val
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() => {
                                    setCastFilter(x.val)
                                }}
                                key={i}
                            >
                                {x.name}
                            </button>
                        ))}
                    </div>
                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {person?.combined_credits?.cast
                            ?.filter((x) => x.media_type === castFilter)
                            ?.map((x, i) => (
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
                                        {(x.release_date ||
                                            x.first_air_date) && (
                                            <div>
                                                {(
                                                    x.release_date ||
                                                    x.first_air_date
                                                )?.substring(0, 4)}
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
