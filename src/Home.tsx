import { Link } from 'react-router-dom'
import { useSearchQuery } from './gql'
import { IMG_URLs } from './consts'
import { Stars } from './Stars'
import { useSyncState } from './util'

export function Home() {
    document.title = 'TMDB Quickly'

    let [query, setQuery] = useSyncState({ key: 'query', initVal: '' })
    let [page, setPage] = useSyncState({ key: 'page', initVal: '1' })
    let [tab, setTab] = useSyncState({ key: 'homeTab', initVal: 'movie' })

    let nextPage = () => setPage((parseInt(page) + 1).toString())
    let lastPage = () => setPage((parseInt(page) - 1).toString())

    let [res] = useSearchQuery({ query, page })
    let { data, fetching, error } = res

    let results = data?.search?.results
    let maxPages = data?.search?.total_pages

    const MAX_OVERVIEW_LENGTH = 100

    const load_silhouette = (
        <>
            <div className='bg3 rounded-xl w-[94px] h-[141px]'></div>
            <div className='col space-y-1 pl-2'>
                <div className='row bg3 p-2 w-[150px] rounded-full' />
                <div className='row bg3 p-2 w-[100px] rounded-full' />
                <div className='row bg3 p-2 w-[50px] rounded-full' />
            </div>
        </>
    )

    const load_array: Array<JSX.Element> = new Array(9).fill(load_silhouette)

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
            </div>
            {}
            <div className='grid123'>
                {fetching ? (
                    <>
                        {load_array.map((x, i) => (
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
                                    to={`${x.media_type}/${x.id}`}
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
                        className='btn bg2'
                        disabled={parseInt(page) <= 1}
                        onClick={lastPage}
                    >
                        BACK
                    </button>
                    <div className='btn bg2'>{page}</div>
                    <button
                        className='btn bg2'
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
