import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ADVANCED_SEARCH_ICON,
    IMG_URLs,
    LOADER__SEARCH_CARD_ARRAY,
    MAX_OVERVIEW_LENGTH
} from './consts'
import { useyearQuery } from './gql'
import { Stars } from './Stars'
import { useSyncState } from './util'

export function AdvancedSearch() {
    let [tab, setTab] = useSyncState({ key: 'advancedTab', initVal: 'MOVIES' })
    let [query, setQuery] = useSyncState({ key: 'query' })
    let [year, setYear] = useSyncState({ key: 'year' })
    let [imdb, setIMDB] = useSyncState({ key: 'imdb' })

    useEffect(() => {
        setPage('1')
    }, [query, year])

    let [page, setPage] = useSyncState({ key: 'advancedPage', initVal: '1' })
    let [res] = useyearQuery({
        query,
        year,
        page,
        type: tab === 'MOVIES' ? 'movie' : 'tv'
    })
    let { data, fetching, error } = res
    let maxPages = data?.year?.total_pages

    let nextPage = () => setPage((parseInt(page) + 1).toString())
    let previousPage = () => setPage((parseInt(page) - 1).toString())

    let updateArgs = () => {
        setQuery(
            document.querySelector<HTMLInputElement>('#query')!.value || ''
        )
        setYear(document.querySelector<HTMLInputElement>('#year')!.value || '')
    }

    return (
        <>
            <div className='row justify-center'>
                <span className='text-xl'>ADVANCED SEARCH</span>
            </div>
            <div className='btn-row'>
                {['MOVIES', 'SHOWS', 'IMDB ID'].map((x, i) => (
                    <div
                        key={i}
                        className={`${tab === x ? 'bg3' : 'bg2'} btn`}
                        onClick={() => setTab(x)}
                    >
                        {x}
                    </div>
                ))}
                <div
                    className='bg2 px-3 py-2 rounded-xl'
                    onClick={() => updateArgs()}
                >
                    {ADVANCED_SEARCH_ICON}
                </div>
            </div>

            {tab === 'IMDB ID' ? (
                <input
                    type='text'
                    id='imdb'
                    className='bg2 p-2 rounded-xl text-lg'
                    placeholder='IMDB ID'
                    defaultValue={imdb}
                />
            ) : (
                <>
                    <input
                        type='text'
                        id='query'
                        className='bg2 p-2 rounded-xl text-lg'
                        placeholder='Search Query'
                        defaultValue={query}
                    />
                    <input
                        type='text'
                        id='year'
                        className='bg2 p-2 rounded-xl text-lg'
                        placeholder='Year'
                        defaultValue={year}
                    />
                </>
            )}
            {query && tab !== 'IMDB ID' && (
                <>
                    {error && <div className='err'>{error.message}</div>}
                    <div className='grid123'>
                        {fetching ? (
                            <>
                                {LOADER__SEARCH_CARD_ARRAY.map((x, i) => (
                                    <div
                                        className='row bg2 p-2 rounded-xl'
                                        key={i}
                                    >
                                        {x}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {data?.year?.results?.map((x, i) => (
                                    <Link
                                        to={`/${
                                            tab === 'MOVIES' ? 'movie' : 'tv'
                                        }/${x.id}`}
                                        className='card'
                                        key={i}
                                    >
                                        {x.poster_path && (
                                            <img
                                                src={`${IMG_URLs.W94H141}${x.poster_path}`}
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
                                            {(x.title || x.name) && (
                                                <div>{x.title || x.name}</div>
                                            )}
                                            {x.vote_average! > 0 && (
                                                <Stars
                                                    average={x.vote_average}
                                                />
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
                    <div className='btn-row'>
                        <button
                            className={`btn ${
                                parseInt(page) <= 1 ? 'disabled' : 'bg2'
                            }`}
                            disabled={parseInt(page) <= 1}
                            onClick={previousPage}
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
                </>
            )}
            {tab === 'IMDB ID' && <FindByIMDB />}
        </>
    )
}

function FindByIMDB() {
    return (
        <div className='btn bg-blue-900 text-center italic'>
            this feature coming in future update
        </div>
    )
}
