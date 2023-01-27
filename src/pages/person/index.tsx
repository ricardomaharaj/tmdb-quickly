import { useParams, useSearchParams } from 'react-router-dom'
import { setTitle, toDateString } from '../../util'
import { imageUrls, loadSilhouette } from '../../consts'
import { usePersonQuery } from '../../gql'
import { Card } from '../../comps/card'

enum Tabs {
    Bio = 'BIO',
    Cast = 'CAST',
    Crew = 'CREW',
    Images = 'IMAGES'
}

enum CreditsTab {
    Movies = 'MOVIES',
    Shows = 'SHOWS'
}

export function Person() {
    const [params, setParams] = useSearchParams()

    const tab = params.get('tab') || Tabs.Bio
    const creditsTab = params.get('creditsTab') || CreditsTab.Movies
    const query = params.get('query') || ''
    const page = parseInt(params.get('page') || '1')

    const replaceSearchParams = (update: any) =>
        setParams(
            { tab, creditsTab, query, page, ...update },
            { replace: true }
        )

    const { id } = useParams()
    const [res] = usePersonQuery({ id })
    const { data, fetching, error } = res
    const person = data?.person

    setTitle(person?.name)

    const calculateAge = (birthday: string, deathday?: string) => {
        let age: number = 0
        const start: Date = new Date(birthday.replace('-', '/'))
        let end: Date = new Date()
        if (deathday) end = new Date(deathday.replace('-', '/'))
        age = end.getFullYear() - start.getFullYear()
        return age
    }

    /** divide bio by sentence for easy reading */
    const bioSplitter = (bio: string) => {
        // add newline every period
        bio = bio.replaceAll('. ', '.\n')

        // remove newline where inappropriate
        const prefixes = ['Dr', 'Mr', 'Ms', 'Mrs', 'Jr', 'Lt', 'Vol']
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

    const creditsFilter = creditsTab === CreditsTab.Movies ? 'movie' : 'tv'

    const firstPage = page === 1

    const perPage = 9
    const startPage = (page - 1) * perPage
    const endPage = page * perPage

    const cast = person?.combined_credits?.cast
        ?.filter((x) => x.media_type === creditsFilter)
        .filter((x) => {
            const q = query.toLowerCase()
            const media = (x.name || x.title)?.toLowerCase()
            const character = x.character?.toLowerCase()
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

    const crew = person?.combined_credits?.crew
        ?.filter((x) => x.media_type === creditsFilter)
        .filter((x) => {
            const q = query.toLowerCase()
            const media = (x.name || x.title)?.toLowerCase()
            const job = x.job?.toLowerCase()
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

    if (fetching) return loadSilhouette
    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>
    return (
        <>
            <div className='row bg-slate-800 rounded-xl p-2'>
                {person?.profile_path && (
                    <img
                        src={`${imageUrls.W150H225}${person?.profile_path}`}
                        className='rounded-xl mr-2 max-w-[150px] max-h-[225px]'
                        width='150'
                        height='225'
                        alt=''
                    />
                )}
                <div className='col space-y-1'>
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
            <div className='row space-x-2 overflow-scroll md:overflow-hidden'>
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
            {tab === Tabs.Bio && (
                <>
                    {person?.biography && (
                        <div className='bg-slate-800 rounded-xl p-3 space-y-2'>
                            {bioSplitter(person.biography)}
                        </div>
                    )}
                </>
            )}
            {[Tabs.Cast, Tabs.Crew].includes(tab as Tabs) && (
                <>
                    <div className='row space-x-2'>
                        {Object.values(CreditsTab).map((x, i) => (
                            <button
                                className={`${
                                    creditsTab === x
                                        ? 'bg-slate-700'
                                        : 'bg-slate-800'
                                } rounded-xl p-2 hover:bg-slate-600`}
                                onClick={() =>
                                    replaceSearchParams({
                                        creditsTab: x,
                                        page: 1
                                    })
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
                        placeholder='Search'
                        defaultValue={query}
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
                                    image={x.poster_path}
                                    primary={x.name || x.title}
                                    secondary={x.character}
                                    tertiary={toDateString(
                                        x.first_air_date || x.release_date
                                    )}
                                    variant={
                                        x.media_type === 'tv' ? 'tv' : 'movie'
                                    }
                                    href={`/${x.media_type}/${x.id}`}
                                    key={i}
                                />
                            ))}
                        {tab === Tabs.Crew &&
                            crew?.map((x, i) => (
                                <Card
                                    image={x.poster_path}
                                    primary={x.name || x.title}
                                    secondary={x.job}
                                    tertiary={
                                        x.first_air_date || x.release_date
                                            ? toDateString(
                                                  x.first_air_date! ||
                                                      x.release_date!
                                              )
                                            : ''
                                    }
                                    variant={
                                        x.media_type === 'tv' ? 'tv' : 'movie'
                                    }
                                    href={`/${x.media_type}/${x.id}`}
                                    key={i}
                                />
                            ))}
                    </div>
                    <div className='row space-x-2'>
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
            {tab === Tabs.Images && (
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {person?.images?.profiles?.map((x, i) => (
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
    )
}
