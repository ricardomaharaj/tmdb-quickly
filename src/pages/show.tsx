import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { removeVoiceTag, runtimeCalc, setTitle, toDateString } from '../util'
import { imageUrls, loadSilhouette } from '../consts'
import { useShowQuery } from '../gql'
import { PosterCard } from '../comps/poster-card'
import { VideoCard } from '../comps/video-card'
import { AdaptablePoster } from '../comps/adaptable-poster'
import { ImageGrid } from '../comps/image-grid'

enum Tabs {
  Info = 'INFO',
  Cast = 'CAST',
  Crew = 'CREW',
  Seasons = 'SEASONS',
  Images = 'IMAGES',
  Videos = 'VIDEOS'
}

enum ImageTabs {
  Posters = 'POSTERS',
  Backdrops = 'BACKDROPS'
}

export function Show() {
  const [imageTab, setImageTab] = useState('POSTERS')
  const [params, setParams] = useSearchParams()

  const tab = params.get('tab') || Tabs.Info
  const query = params.get('query') || ''
  const page = parseInt(params.get('page') || '1')

  const replaceSearchParams = (update: any) =>
    setParams({ tab, query, page, ...update }, { replace: true })

  const { id } = useParams()
  const { data, fetching, error } = useShowQuery({ id })[0]
  const show = data?.show

  setTitle(show?.name)

  const startYear = show?.first_air_date?.substring(0, 4)
  const endYear = show?.last_air_date?.substring(0, 4)
  const showOver = show?.status === 'Ended' || show?.status === 'Canceled'

  const firstPage = page === 1

  const perPage = 9
  const startPage = (page - 1) * perPage
  const endPage = page * perPage

  const cast = show?.aggregate_credits?.cast
    ?.filter((x) => {
      const q = query.toLowerCase()

      // forEach does not work in this case
      for (let i = 0; i < x?.roles?.length!; i++) {
        const character = x?.roles?.[i]?.character?.toLowerCase()
        if (character?.includes(q)) return true
      }

      const name = x?.name?.toLowerCase()
      if (name?.includes(q)) return true

      return false
    })
    ?.sort((a, b) => (a.total_episode_count! > b.total_episode_count! ? -1 : 1))
    ?.slice(startPage, endPage)

  const crew = show?.aggregate_credits?.crew
    ?.filter((x) => {
      const q = query.toLowerCase()

      // forEach does not work in this case
      for (let i = 0; i < x?.jobs?.length!; i++) {
        const job = x?.jobs?.[i]?.job?.toLowerCase()
        if (job?.includes(q)) return true
      }

      const name = x?.name?.toLowerCase()
      if (name?.includes(q)) return true

      return false
    })
    ?.sort((a, b) => (a.total_episode_count! > b.total_episode_count! ? -1 : 1))
    ?.slice(startPage, endPage)

  const castOrCrewTab = tab === Tabs.Cast || tab === Tabs.Crew

  const networksAndCompanies = show?.networks?.map((x) => x.name)
  show?.production_companies?.forEach(({ name }) => {
    if (networksAndCompanies?.indexOf(name) === -1) {
      networksAndCompanies.push(name)
    }
  })

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div
        className='rounded-xl bg-cover bg-center'
        style={{
          backgroundImage: `url(${imageUrls.W500}${show?.backdrop_path})`
        }}
      >
        <div className='row blur-bg'>
          {show?.poster_path && (
            <AdaptablePoster poster_path={show?.poster_path} />
          )}
          <div className='space-y-1'>
            <div>
              {startYear && <span>{startYear}</span>}
              {endYear && (
                <>
                  {showOver && startYear !== endYear && (
                    <span>{` - ${endYear}`}</span>
                  )}
                </>
              )}
              {show?.status === 'Returning Series' && <span>{' - '}</span>}
            </div>
            {show?.name && <div className='font-bold'>{show.name}</div>}
            {show?.tagline && <div className='text-sm'>{show?.tagline}</div>}
          </div>
        </div>
      </div>
      <div className='row scroll-hide space-x-2'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`btn ${tab === x && 'sel'}`}
            onClick={() => replaceSearchParams({ tab: x, page: 1 })}
            key={i}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          {show?.overview && <div className='bubble'>{show?.overview}</div>}
          <div className='bubble'>
            {show?.status && <div>{`Status: ${show.status}`}</div>}
            {show?.type && <div>{`Show Type: ${show.type}`}</div>}
            {show?.episode_run_time
              ? show.episode_run_time[0] > 0 && (
                  <div>
                    {`Runtime: ${runtimeCalc(show.episode_run_time[0])}`}
                  </div>
                )
              : null}
            {show?.number_of_seasons
              ? show.number_of_seasons > 0 && (
                  <div>{`Seasons: ${show?.number_of_seasons}`}</div>
                )
              : null}
            {show?.number_of_episodes
              ? show.number_of_episodes > 0 && (
                  <div>{`Episodes: ${show?.number_of_episodes}`}</div>
                )
              : null}
            {show?.external_ids?.imdb_id && (
              <div>
                <a
                  href={`https://www.imdb.com/title/${show.external_ids.imdb_id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  IMDB
                </a>
                <span>{` ID: ${show.external_ids.imdb_id}`}</span>
              </div>
            )}
            <div>
              <a
                href={`https://www.themoviedb.org/tv/${show?.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                TMDB
              </a>
              <span>{` ID: ${id}`}</span>
            </div>
          </div>
          <div className='row scroll-hide space-x-2'>
            {show?.genres?.map((x, i) => (
              <div className='tag' key={i}>
                {x.name}
              </div>
            ))}
          </div>
          <div className='row scroll-hide space-x-2'>
            {networksAndCompanies?.map((x, i) => (
              <div className='tag text-sm' key={i}>
                {x}
              </div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && (
        <>
          <input
            type='text'
            className='input'
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
                  secondary={x?.roles
                    ?.map(
                      (role) =>
                        `${removeVoiceTag(role.character!)} (${
                          role.episode_count
                        } Eps)`
                    )
                    .slice(0, 3)
                    .join(' | ')}
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
                  secondary={x.jobs
                    ?.map((job) => `${job.job} (${job.episode_count} Eps)`)
                    .slice(0, 3)
                    .join(' | ')}
                  variant='person'
                  href={`/person/${x.id}`}
                  key={i}
                />
              ))}
          </div>
          <div className='row scroll-hide space-x-2'>
            <button
              className='btn'
              disabled={firstPage}
              onClick={() => replaceSearchParams({ page: page - 1 })}
            >
              BACK
            </button>
            <div className='p-2'>{page}</div>
            <button
              className='btn'
              onClick={() => replaceSearchParams({ page: page + 1 })}
            >
              NEXT
            </button>
          </div>
        </>
      )}
      {tab === Tabs.Seasons && (
        <>
          <div className='grid123'>
            {show?.seasons &&
              show?.seasons.map((x, i) => (
                <PosterCard
                  image={x.poster_path}
                  primary={x.name}
                  secondary={`${x.episode_count} Episodes`}
                  tertiary={x.air_date ? toDateString(x.air_date) : ''}
                  variant='tv'
                  href={`season/${x.season_number}`}
                  key={i}
                />
              ))}
          </div>
        </>
      )}
      {tab === Tabs.Images && (
        <>
          <div className='row scroll-hide space-x-2'>
            {Object.values(ImageTabs).map((x, i) => (
              <button
                className={`btn ${imageTab === x && 'sel'}`}
                onClick={() => setImageTab(x)}
                key={i}
              >
                {x}
              </button>
            ))}
          </div>
          {imageTab === ImageTabs.Posters && (
            <ImageGrid variant='234' images={show?.images?.posters} />
          )}
          {imageTab === ImageTabs.Backdrops && (
            <ImageGrid variant='123' images={show?.images?.backdrops} />
          )}
        </>
      )}
      {tab === Tabs.Videos && (
        <div className='grid234'>
          {show?.videos?.results?.map((x, i) => (
            <VideoCard video={x} key={i} />
          ))}
        </div>
      )}
    </>
  )
}
