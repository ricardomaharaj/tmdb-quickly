import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toDateString } from '../util'
import { imageUrls, loadSilhouette } from '../consts'
import { useEpisodeQuery, useShowQuery } from '../gql'
import { PosterCard } from '../comps/poster-card'
import { ImageGrid } from '../comps/image-grid'

enum Tabs {
  Info = 'INFO',
  Guests = 'GUESTS',
  Crew = 'CREW',
  Images = 'IMAGES'
}

export function Episode() {
  const [params, setParams] = useSearchParams()

  const tab = params.get('tab') || Tabs.Info

  const { id, season_number, episode_number } = useParams()
  const show = useShowQuery({ id })[0].data?.show
  const [res] = useEpisodeQuery({
    id,
    season_number,
    episode_number
  })
  const { data, fetching, error } = res
  const episode = data?.episode

  const replaceSearchParams = (update: any) =>
    setParams({ tab, ...update }, { replace: true })

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div
        className='bg-cover bg-center rounded-xl'
        style={{
          backgroundImage: `url(${imageUrls.W500}${episode?.still_path})`
        }}
      >
        <div className='col space-y-2 p-10 rounded-xl backdrop-brightness-50 backdrop-blur-sm md:backdrop-blur xl:p-20'>
          {show?.name && (
            <Link className='font-bold plain' to={`/tv/${id}`}>
              {show?.name}
            </Link>
          )}
          <div className='scroll-row'>
            <Link
              className='font-bold plain'
              to={`/tv/${id}/season/${season_number}`}
            >
              Season {season_number}
            </Link>
            <div>Episode {episode_number}</div>
          </div>
          {episode?.name && <div>{episode.name}</div>}
          {episode?.air_date && <div>{toDateString(episode.air_date)}</div>}
        </div>
      </div>
      <div className='scroll-row'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'sel'}`}
            onClick={() => replaceSearchParams({ tab: x })}
            key={i}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          {episode?.overview && (
            <div className='bubble'>{episode.overview}</div>
          )}
        </>
      )}
      {tab === Tabs.Guests && (
        <div className='grid123'>
          {episode?.guest_stars?.map((x, i) => (
            <PosterCard
              image={x.profile_path}
              primary={x.name}
              secondary={x.character}
              variant='person'
              href={`/person/${x.id}`}
              key={i}
            />
          ))}
        </div>
      )}
      {tab === Tabs.Crew && (
        <div className='grid123'>
          {episode?.crew?.map((x, i) => (
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
      )}
      {tab === Tabs.Images && (
        <ImageGrid variant='123' images={episode?.images?.stills} />
      )}
    </>
  )
}