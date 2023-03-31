import { useGlobalCtx } from "@/state/global"
import { SearchResult, SearchResults } from "@/types/search-results"
import { overviewTrimmer } from "@/util"
import { api } from "@/util/local-api"
import { useEffect, useState } from "react"

export default function Home() {
  const [results, setResults] = useState<SearchResults>()

  const ctx = useGlobalCtx()
  const { query, setQuery, page, setPage } = ctx.search

  useEffect(() => {
    setPage(1)
    api
      .get<SearchResults>("search", { query, page: page.toString() })
      .then((x) => setResults(x))
  }, [query])

  return (
    <>
      {!query && (
        <div className="col m-2">
          <div className="row justify-center">
            <div className="text-lg">Trending This Week</div>
          </div>
        </div>
      )}
      <div className="col mx-2 mt-4 space-y-3">
        {results?.results?.map((result) => (
          <SearchResultCard result={result} key={result.id} />
        ))}
      </div>
    </>
  )
}

function SearchResultCard(props: { result: SearchResult }) {
  const { result } = props
  const { title, name } = result
  const { overview } = result
  const { poster_path } = result

  return (
    <>
      <div className="row rounded-xl">
        {poster_path ? (
          <div className="col">
            <img
              src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
              className="max-w-[100px] rounded-l-xl"
              loading="lazy"
              alt=""
            />
          </div>
        ) : (
          <div className="col h-[150px] w-[100px] rounded-l-xl bg-black"></div>
        )}
        <div className="col rounded-r-xl border border-l-0 border-black">
          <div className="col ml-1 mt-1 p-1">
            <div className="font-bold">{title || name}</div>
            {overview && (
              <div className="italic">{overviewTrimmer(overview)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
