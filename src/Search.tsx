import { Link } from 'react-router-dom'
import { IMG_URLs, Props } from './consts'
import { Fragment } from 'react'
import { useSearchQuery } from './types/Search'

export function Search({ state, updateState }: Props) {
    document.title = 'TMDB Quickly'

    let [res] = useSearchQuery({
        query: state.searchQuery,
        page: state.searchPage.toString()
    })
    let { data, fetching, error } = res

    let results = data?.search?.results
    let maxPages = data?.search?.total_pages

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
        { name: 'MOVIES', val: 'movie' },
        { name: 'SHOWS', val: 'tv' },
        { name: 'PEOPLE', val: 'person' }
    ]

    const MAX_OVERVIEW_LENGTH = 100

    if (error)
        return <div className='bg-red-700 rounded-xl p-4'>{error.message}</div>

    return (
        <>
            <input
                type='text'
                id='query'
                placeholder='SEARCH'
                defaultValue={state.searchQuery}
                className='bg-slate-800 p-3 text-xl text-center rounded-xl outline-none'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        updateState({
                            searchQuery: e.currentTarget.value,
                            searchPage: 1
                        })
                    }
                }}
            />
            <div className='flex flex-row space-x-2 overflow-scroll md:overflow-hidden'>
                {TABS.map((x, i) => (
                    <button
                        className={`${
                            state.searchTab === x.val
                                ? 'bg-slate-700'
                                : 'bg-slate-800'
                        } hover:bg-slate-600 rounded-xl p-2`}
                        onClick={() => updateState({ searchTab: x.val })}
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
                        {results
                            ?.filter((x) => x.media_type === state.searchTab)
                            .map((x, i) => (
                                <Link
                                    to={`/${x.media_type}/${x.id}`}
                                    className='bg-slate-800 flex flex-row rounded-xl p-2 hover:bg-slate-700'
                                    key={i}
                                >
                                    {(x.poster_path || x.profile_path) && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${
                                                x.poster_path || x.profile_path
                                            }`}
                                            className='rounded-xl mr-2 max-w-[94px] max-h-[141px]'
                                            width='94'
                                            height='141'
                                            loading='lazy'
                                            alt=''
                                        />
                                    )}
                                    <div>
                                        {(x.release_date ||
                                            x.first_air_date) && (
                                            <div className='text-sm'>
                                                {(
                                                    x.release_date ||
                                                    x.first_air_date
                                                )?.substring(0, 4)}
                                            </div>
                                        )}
                                        {(x.name || x.title) && (
                                            <div>{x.name || x.title}</div>
                                        )}
                                        {x.overview && (
                                            <div className='text-slate-400'>
                                                {x.overview.length >
                                                MAX_OVERVIEW_LENGTH
                                                    ? x.overview
                                                          .substring(
                                                              0,
                                                              MAX_OVERVIEW_LENGTH -
                                                                  3
                                                          )
                                                          .padEnd(
                                                              MAX_OVERVIEW_LENGTH,
                                                              '.'
                                                          )
                                                    : x.overview}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </>
                )}
            </div>
            {state.searchQuery && (
                <div className='flex flex-row space-x-2'>
                    <button
                        className={`${
                            state.searchPage <= 1
                                ? 'text-slate-600'
                                : 'bg-slate-800 hover:bg-slate-600'
                        } rounded-xl p-2`}
                        disabled={state.searchPage <= 1}
                        onClick={() =>
                            updateState({ searchPage: state.searchPage - 1 })
                        }
                    >
                        BACK
                    </button>
                    <div className='p-2'>{state.searchPage}</div>
                    <button
                        className={`${
                            state.searchPage >= maxPages!
                                ? 'text-slate-600'
                                : 'bg-slate-800 hover:bg-slate-600'
                        } rounded-xl p-2`}
                        disabled={state.searchPage >= maxPages!}
                        onClick={() =>
                            updateState({ searchPage: state.searchPage + 1 })
                        }
                    >
                        NEXT
                    </button>
                </div>
            )}
        </>
    )
}