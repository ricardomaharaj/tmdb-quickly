import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePersonQuery } from './gql'
import { toDateString, useSyncState } from './util'
import { IMG_URLs } from './consts'
import { Stars } from './Stars'

export function Person() {
    let [castFilter, setCastFilter] = useState('movie')
    let [crewFilter, setCrewFilter] = useState('ALL')

    let [tab, setTab] = useSyncState({ key: 'personTab', initVal: 'BIO' })

    let { id } = useParams()
    let [res] = usePersonQuery({ id })
    let { data, fetching, error } = res
    let person = data?.person

    document.title = `${person?.name} | TMDB Quickly`

    let crewFilterOpts: string[] = []
    person?.combined_credits?.crew?.forEach(({ job }) => {
        if (crewFilterOpts.findIndex((x) => x === job) === -1)
            crewFilterOpts.push(job!)
    })
    crewFilterOpts.splice(0, 0, 'ALL')

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
    if (error) return <div className='err'>{error.message}</div>
    return (
        <>
            <div className='card'>
                {person?.profile_path && (
                    <img
                        src={`${IMG_URLs.W150H225}${person?.profile_path}`}
                        className='card-img w150-h225'
                        width='150'
                        height='225'
                        alt=''
                    />
                )}
                <div className='card-text'>
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
            <div className='scroll-row'>
                {['BIO', 'CAST', 'CREW', 'IMAGES'].map((x, i) => (
                    <div
                        className={`btn ${tab === x ? 'bg3' : 'bg2'}`}
                        onClick={() => setTab(x)}
                        key={i}
                    >
                        {x}
                    </div>
                ))}
            </div>
            {tab === 'BIO' && (
                <>
                    {person?.biography && (
                        <div className='bubble space-y-2'>
                            {bioSplitter(person.biography)}
                        </div>
                    )}
                </>
            )}
            {tab === 'CAST' && (
                <>
                    <div className='btn-row'>
                        {[
                            { name: 'MOVIES', val: 'movie' },
                            { name: 'SHOWS', val: 'tv' }
                        ].map((x, i) => (
                            <div
                                className={`btn ${
                                    castFilter === x.val ? 'bg3' : 'bg2'
                                }`}
                                onClick={() => {
                                    setCastFilter(x.val)
                                }}
                                key={i}
                            >
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <div className='grid123'>
                        {person?.combined_credits?.cast
                            ?.filter((x) => x.media_type === castFilter)
                            ?.sort((a, b) => {
                                let aDate = a.release_date || a.first_air_date
                                let bDate = b.release_date || b.first_air_date
                                if (!aDate || !bDate) return 1
                                if (Date.parse(aDate) > Date.parse(bDate))
                                    return -1
                                else return 1
                            })
                            ?.map((x, i) => (
                                <Link
                                    to={`/${x.media_type}/${x.id}`}
                                    className='card'
                                    key={i}
                                >
                                    {x.poster_path && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                            className='card-img w94-h141'
                                            loading='lazy'
                                            width='94'
                                            height='141'
                                            alt=''
                                        />
                                    )}
                                    <div className='card-text'>
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
                                            <div className='subtext'>
                                                {x.character}
                                            </div>
                                        )}
                                        {x.vote_average
                                            ? x.vote_average > 0 && (
                                                  <Stars
                                                      average={x.vote_average}
                                                  />
                                              )
                                            : null}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </>
            )}
            {tab === 'CREW' && (
                <>
                    <div className='single-row'>
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
                        {person?.combined_credits?.crew
                            ?.filter((x) => {
                                if (crewFilter === 'ALL') return true
                                if (x.job === crewFilter) return true
                                else return false
                            })
                            ?.sort((a, b) => {
                                let aDate = a.release_date || a.first_air_date
                                let bDate = b.release_date || b.first_air_date
                                if (!aDate || !bDate) return 1
                                if (Date.parse(aDate) > Date.parse(bDate))
                                    return -1
                                else return 1
                            })
                            ?.map((x, i) => (
                                <Link
                                    to={`/${x.media_type}/${x.id}`}
                                    key={i}
                                    className='card'
                                >
                                    {x.poster_path && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${x.poster_path}`}
                                            className='card-img w94-h141'
                                            loading='lazy'
                                            width='94'
                                            height='141'
                                            alt=''
                                        />
                                    )}
                                    <div className='card-text'>
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
                                        {x.job && (
                                            <div className='subtext'>
                                                {x.job}
                                            </div>
                                        )}
                                        {x.vote_average
                                            ? x.vote_average > 0 && (
                                                  <Stars
                                                      average={x.vote_average}
                                                  />
                                              )
                                            : null}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </>
            )}
            {tab === 'IMAGES' && (
                <>
                    <div className='grid234'>
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
                </>
            )}
        </>
    )
}
