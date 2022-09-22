import { Link } from 'react-router-dom'
import { useSearchQuery } from './gql'
import {
    ADVANCED_SEARCH_ICON,
    IMG_URLs,
    LOADER__SEARCH_CARD_ARRAY,
    MAX_OVERVIEW_LENGTH
} from './consts'
import { Stars } from './Stars'
import { useSyncState } from './util'
import { useEffect } from 'react'

export function Home() {
    document.title = 'TMDB Quickly'

    let [query, setQuery] = useSyncState({ key: 'query' })
    let [page, setPage] = useSyncState({ key: 'page', initVal: '1' })
    let [tab, setTab] = useSyncState({ key: 'homeTab', initVal: 'movie' })

    useEffect(() => setPage('1'), [query])

    let nextPage = () => setPage((parseInt(page) + 1).toString())
    let lastPage = () => setPage((parseInt(page) - 1).toString())

    let [res] = useSearchQuery({ query, page })
    let { data, fetching, error } = res

    let results = data?.search?.results
    let maxPages = data?.search?.total_pages

    if (error) return <div className='err'>{error.message}</div>

    return (
        <>
            <input
                type='text'
                id='query'
                placeholder='SEARCH'
                defaultValue={query}
                className='bg2 p-3 text-xl text-center rounded-xl outline-none'
                onKeyDown={(e) =>
                    e.key === 'Enter' ? setQuery(e.currentTarget.value) : null
                }
            />
            <div className='btn-row'>
                {[
                    { name: 'MOVIES', val: 'movie' },
                    { name: 'SHOWS', val: 'tv' },
                    { name: 'PEOPLE', val: 'person' }
                ].map((x, i) => (
                    <div
                        className={`btn ${tab === x.val ? 'bg3' : 'bg2'}`}
                        onClick={() => setTab(x.val)}
                        key={i}
                    >
                        {x.name}
                    </div>
                ))}
                {query && (
                    <Link
                        to='/advancedSearch'
                        className='bg2 px-3 py-2 rounded-xl'
                    >
                        {ADVANCED_SEARCH_ICON}
                    </Link>
                )}
            </div>
            <div className='grid123'>
                {fetching ? (
                    <>
                        {LOADER__SEARCH_CARD_ARRAY.map((x, i) => (
                            <div className='row bg2 p-2 rounded-xl' key={i}>
                                {x}
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {results
                            ?.filter((x) => x.media_type === tab)
                            .map((x, i) => (
                                <Link
                                    to={`/${x.media_type}/${x.id}`}
                                    className='card'
                                    key={i}
                                >
                                    {(x.poster_path || x.profile_path) && (
                                        <img
                                            src={`${IMG_URLs.W94H141}${
                                                x.poster_path || x.profile_path
                                            }`}
                                            className='card-img w94-h141'
                                            width='94'
                                            height='141'
                                            loading='lazy'
                                            alt=''
                                        />
                                    )}
                                    <div className='card-text'>
                                        {query &&
                                            (x.release_date ||
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
                                        {x.vote_average! > 0 && (
                                            <Stars average={x.vote_average} />
                                        )}
                                        {x.overview && (
                                            <div className='subtext'>
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
            {query && (
                <div className='btn-row'>
                    <button
                        className={`btn ${
                            parseInt(page) <= 1 ? 'disabled' : 'bg2'
                        }`}
                        disabled={parseInt(page) <= 1}
                        onClick={lastPage}
                    >
                        BACK
                    </button>
                    <div className='btn bg2'>{page}</div>
                    <button
                        className={`btn ${
                            parseInt(page) >= maxPages! ? 'disabled' : 'bg2'
                        }`}
                        disabled={parseInt(page) >= maxPages!}
                        onClick={nextPage}
                    >
                        NEXT
                    </button>
                </div>
            )}
        </>
    )
}
