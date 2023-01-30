import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { removeVoiceTag, runtimeCalc, setTitle, toDateString } from '../util'
import { imageUrls, loadSilhouette, releaseTypes } from '../consts'
import { useMovieQuery } from '../gql'
import { PosterCard } from '../comps/poster-card'
import { VideoCard } from '../comps/video-card'
import { AdaptablePoster } from '../comps/adaptable-poster'
import { ImageGrid } from '../comps/image-grid'

enum Tabs {
  Info = 'INFO',
  Cast = 'CAST',
  Crew = 'CREW',
  Images = 'IMAGES',
  Videos = 'VIDEOS'
}

enum ImageTabs {
  Posters = 'POSTERS',
  Backdrops = 'BACKDROPS'
}

export function Movie() {
  const [imageTab, setImageTab] = useState<ImageTabs>(ImageTabs.Posters)
  const [params, setParams] = useSearchParams()

  const tab = params.get('tab') || Tabs.Info
  const query = params.get('query') || ''
  const page = parseInt(params.get('page') || '1')

  const replaceSearchParams = (update: any) =>
    setParams({ tab, query, page, ...update }, { replace: true })

  const { id } = useParams()
  const [res] = useMovieQuery({ id })
  const { data, fetching, error } = res
  const movie = data?.movie

  setTitle(movie?.title)

  const releaseDates = movie?.release_dates?.results?.filter(
    (x) => x?.iso_3166_1 === 'US'
  )[0]?.release_dates

  const firstPage = page === 1

  const perPage = 9
  const startPage = (page - 1) * perPage
  const endPage = page * perPage

  const cast = movie?.credits?.cast
    ?.filter((x) => {
      const name = x.name?.toLowerCase()
      const character = x.character?.toLowerCase()
      const q = query.toLowerCase()
      if (name?.includes(q)) return true
      if (character?.includes(q)) return true
      return false
    })
    ?.slice(startPage, endPage)

  const crew = movie?.credits?.crew
    ?.filter((x) => {
      const name = x.name?.toLowerCase()
      const job = x.job?.toLowerCase()
      const q = query.toLowerCase()
      if (name?.includes(q)) return true
      if (job?.includes(q)) return true
      return false
    })
    ?.slice(startPage, endPage)

  const castOrCrewTab = tab === Tabs.Cast || tab === Tabs.Crew

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div
        className='bg-cover bg-center rounded-xl'
        style={{
          backgroundImage: `url(${imageUrls.W500}${movie?.backdrop_path})`
        }}
      >
        <div className='blur-bg'>
          {movie?.poster_path && (
            <AdaptablePoster poster_path={movie.poster_path} />
          )}
          <div className='space-y-1'>
            {movie?.release_date && (
              <div>{movie.release_date.substring(0, 4)}</div>
            )}
            {movie?.title && <div className='font-bold'>{movie.title}</div>}
            {movie?.tagline && <div className='text-sm'>{movie.tagline}</div>}
          </div>
        </div>
      </div>
      <div className='scroll-row'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'sel'}`}
            onClick={() => replaceSearchParams({ tab: x, page: 1 })}
            key={i}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          {movie?.overview && <div className='bubble'>{movie.overview}</div>}
          <div className='bubble'>
            {movie?.status && <div>Status: {movie?.status}</div>}
            {movie?.runtime
              ? movie.runtime > 0 && (
                  <div>{`Runtime: ${runtimeCalc(movie.runtime)}`}</div>
                )
              : null}
            {movie?.budget
              ? movie.budget > 0 && (
                  <div>{`Budget: \$${movie.budget.toLocaleString()}`}</div>
                )
              : null}
            {movie?.revenue
              ? movie.revenue > 0 && (
                  <div>{`Revenue: \$${movie.revenue.toLocaleString()}`}</div>
                )
              : null}
            {movie?.budget && movie.revenue
              ? movie.budget > 0 &&
                movie.revenue > 0 && (
                  <div>
                    {`Earnings: \$${(
                      movie.revenue - movie.budget
                    ).toLocaleString()}`}
                  </div>
                )
              : null}
            {movie?.original_language && (
              <div>{`Original Language: ${movie?.original_language}`}</div>
            )}
            {movie?.original_title && (
              <div>{`Original Title: ${movie?.original_title}`}</div>
            )}
            {movie?.imdb_id && (
              <div>
                <a
                  className='underline'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                >
                  IMDB
                </a>
                <span>{` ID: ${movie.imdb_id}`}</span>
              </div>
            )}
            <div>
              <a
                className='underline'
                target='_blank'
                rel='noopener noreferrer'
                href={`https://www.themoviedb.org/movie/${movie?.id}`}
              >
                TMDB
              </a>
              <span>{` ID: ${id}`}</span>
            </div>
          </div>
          <div className='scroll-row'>
            {movie?.genres?.map((x, i) => (
              <div className='tag' key={i}>
                {x.name}
              </div>
            ))}
          </div>
          <div className='scroll-row'>
            {releaseDates?.map((x, i) => (
              <div className='tag text-sm' key={i}>
                {x.type && <div>{releaseTypes[x.type]}</div>}
                {x.release_date && <div>{toDateString(x.release_date)}</div>}
              </div>
            ))}
          </div>
          <div className='scroll-row'>
            {movie?.production_companies?.map((x, i) => (
              <div className='tag text-sm' key={i}>
                {x.name}
              </div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && (
        <>
          <input
            type='text'
            defaultValue={query}
            placeholder='Search'
            onChange={(e) =>
              replaceSearchParams({
                query: e.currentTarget.value,
                page: 1
              })
            }
          />
          <div className='grid123'>
            {tab === Tabs.Cast &&
              cast?.map((x, i) => (
                <PosterCard
                  image={x.profile_path}
                  primary={x.name}
                  secondary={removeVoiceTag(x.character!)}
                  variant='person'
                  href={`/person/${x.id}`}
                  key={i}
                />
              ))}
            {tab === Tabs.Crew &&
              crew?.map((x, i) => (
                <PosterCard
                  image={x.profile_path}
                  primary={x.name}
                  secondary={x.job}
                  variant='person'
                  href={`/person/${x.id}`}
                  key={i}
                />
              ))}
          </div>
          <div className='scroll-row'>
            <button
              disabled={firstPage}
              onClick={() => replaceSearchParams({ page: page - 1 })}
            >
              BACK
            </button>
            <div className='p-2'>{page}</div>
            <button onClick={() => replaceSearchParams({ page: page + 1 })}>
              NEXT
            </button>
          </div>
        </>
      )}
      {tab === Tabs.Images && (
        <>
          <div className='scroll-row'>
            {Object.values(ImageTabs).map((x, i) => (
              <button
                className={`${imageTab === x && 'sel'}`}
                onClick={() => setImageTab(x)}
                key={i}
              >
                {x}
              </button>
            ))}
          </div>
          {imageTab === ImageTabs.Posters && (
            <ImageGrid variant='234' images={movie?.images?.posters} />
          )}
          {imageTab === ImageTabs.Backdrops && (
            <ImageGrid variant='123' images={movie?.images?.backdrops} />
          )}
        </>
      )}
      {tab === Tabs.Videos && (
        <div className='grid234'>
          {movie?.videos?.results?.map((x, i) => (
            <VideoCard video={x} key={i} />
          ))}
        </div>
      )}
    </>
  )
}
