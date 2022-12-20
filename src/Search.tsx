import { useSearchParams } from 'react-router-dom'
import { Fragment } from 'react'
import { useSearchQuery } from './gql'
import { overviewTrimmer, setTitle, toDateString } from './util'
import { Card } from './components/Card'

enum Tabs {
    Movies = 'movie',
    Shows = 'tv',
    People = 'person'
}

export function Search() {
    setTitle()

    const [params, setParams] = useSearchParams()

    const tab = params.get('tab') || Tabs.Movies
    const query = params.get('query') || ''
    const page = parseInt(params.get('page') || '1')

    const replaceSearchParams = (update: any) =>
        setParams({ tab, query, page, ...update }, { replace: true })

    const [res] = useSearchQuery({
        query,
        page: page.toString()
    })

    const { data, fetching, error } = res

    let results = data?.search?.results
    const maxPages = data?.search?.total_pages
    const firstPage = page === 1
    const lastPage = page === maxPages

    const load_card_silohette = (
        <>
            <div className='flex flex-row bg-slate-800 rounded-xl'>
                <div className='bg-slate-700 rounded-xl m-2 w-[94px] h-[141px]'></div>
                <div className='flex flex-col mt-2 space-y-2'>
                    <div className='bg-slate-700 rounded-xl p-2 w-[150px]'></div>
                    <div className='bg-slate-700 rounded-xl p-2 w-[100px]'></div>
                    <div className='bg-slate-700 rounded-xl p-2 w-[50px]'></div>
                </div>
            </div>
        </>
    )

    const TABS = [
        { name: 'MOVIES', val: Tabs.Movies },
        { name: 'SHOWS', val: Tabs.Shows },
        { name: 'PEOPLE', val: Tabs.People }
    ]

    results = results?.filter((result) => result.media_type === tab)

    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>

    return (
        <>
            <input
                type='text'
                id='query'
                placeholder='SEARCH'
                defaultValue={query}
                className='bg-slate-800 p-3 text-xl text-center rounded-xl outline-none'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        replaceSearchParams({ query: e.currentTarget.value })
                    }
                }}
            />
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {TABS.map((x, i) => (
                    <button
                        className={`${
                            tab === x.val ? 'bg-slate-700' : 'bg-slate-800'
                        } hover:bg-slate-600 rounded-xl p-2`}
                        onClick={() => replaceSearchParams({ tab: x.val })}
                        key={i}
                    >
                        {x.name}
                    </button>
                ))}
            </div>
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {fetching ? (
                    <>
                        {new Array(9).fill(load_card_silohette).map((x, i) => (
                            <Fragment key={i}>{x}</Fragment>
                        ))}
                    </>
                ) : (
                    <>
                        {results?.map((x, i) => (
                            <Card
                                image={x.poster_path || x.profile_path}
                                primary={x.title || x.name}
                                secondary={
                                    x.media_type === 'person'
                                        ? ''
                                        : overviewTrimmer(x.overview)
                                }
                                tertiary={
                                    x.media_type === 'person'
                                        ? ''
                                        : toDateString(
                                              x.release_date || x.first_air_date
                                          )
                                }
                                variant={tab as Tabs}
                                href={`/${x.media_type}/${x.id}`}
                                key={i}
                            />
                        ))}
                    </>
                )}
            </div>
            {query && (
                <div className='flex flex-row space-x-2'>
                    <button
                        className={`${
                            firstPage
                                ? 'text-slate-600'
                                : 'bg-slate-800 hover:bg-slate-600'
                        } rounded-xl p-2`}
                        disabled={firstPage}
                        onClick={() => replaceSearchParams({ page: page - 1 })}
                    >
                        BACK
                    </button>
                    <div className='p-2'>{page}</div>
                    <button
                        className={`${
                            lastPage
                                ? 'text-slate-600'
                                : 'bg-slate-800 hover:bg-slate-600'
                        } rounded-xl p-2`}
                        disabled={lastPage}
                        onClick={() => replaceSearchParams({ page: page + 1 })}
                    >
                        NEXT
                    </button>
                </div>
            )}
        </>
    )
}
