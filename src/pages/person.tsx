import { useParams, useSearchParams } from 'react-router-dom'
import { setTitle, toDateString } from '../util'
import { loadSilhouette } from '../consts'
import { usePersonQuery } from '../gql'
import { PosterCard } from '../comps/poster-card'
import { AdaptablePoster } from '../comps/adaptable-poster'
import { ImageGrid } from '../comps/image-grid'

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
    setParams({ tab, creditsTab, query, page, ...update }, { replace: true })

  const { id } = useParams()
  const { data, fetching, error } = usePersonQuery({ id })[0]
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
    ?.filter((x) => {
      const q = query.toLowerCase()
      const media = (x.name || x.title)?.toLowerCase()
      const character = x.character?.toLowerCase()
      if (media?.includes(q)) return true
      if (character?.includes(q)) return true
      return false
    })
    ?.sort((a, b) => {
      const aDate = (a.release_date || a.first_air_date)!
      const bDate = (b.release_date || b.first_air_date)!
      return aDate > bDate ? -1 : 1
    })
    ?.slice(startPage, endPage)

  const crew = person?.combined_credits?.crew
    ?.filter((x) => x.media_type === creditsFilter)
    ?.filter((x) => {
      const q = query.toLowerCase()
      const media = (x.name || x.title)?.toLowerCase()
      const job = x.job?.toLowerCase()
      if (media?.includes(q)) return true
      if (job?.includes(q)) return true
      return false
    })
    ?.sort((a, b) => {
      const aDate = (a.release_date || a.first_air_date)!
      const bDate = (b.release_date || b.first_air_date)!
      return aDate > bDate ? -1 : 1
    })
    ?.slice(startPage, endPage)

  const castOrCrewTab = tab === Tabs.Cast || tab === Tabs.Crew

  if (fetching) return loadSilhouette

  if (error) return <div className='err'>{error.message}</div>

  return (
    <>
      <div className='row tag'>
        {person?.profile_path && (
          <AdaptablePoster poster_path={person.profile_path} />
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
            !isNaN(calculateAge(person.birthday, person.deathday)) && (
              <div>
                {`Age: ${calculateAge(person.birthday, person.deathday)}`}
              </div>
            )}
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
      {tab === Tabs.Bio && (
        <>
          {person?.biography && (
            <div className='bubble space-y-4'>
              {bioSplitter(person.biography)}
            </div>
          )}
        </>
      )}
      {castOrCrewTab && (
        <>
          <div className='row scroll-hide space-x-2'>
            {Object.values(CreditsTab).map((x, i) => (
              <button
                className={`btn ${creditsTab === x && 'sel'}`}
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
            className='input'
            placeholder='Search'
            defaultValue={query}
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
                  image={x.poster_path}
                  primary={x.name || x.title}
                  secondary={x.character}
                  tertiary={toDateString(x.first_air_date || x.release_date)}
                  variant={x.media_type === 'tv' ? 'tv' : 'movie'}
                  href={`/${x.media_type}/${x.id}`}
                  key={i}
                />
              ))}
            {tab === Tabs.Crew &&
              crew?.map((x, i) => (
                <PosterCard
                  image={x.poster_path}
                  primary={x.name || x.title}
                  secondary={x.job}
                  tertiary={
                    x.first_air_date || x.release_date
                      ? toDateString(x.first_air_date || x.release_date)
                      : ''
                  }
                  variant={x.media_type === 'tv' ? 'tv' : 'movie'}
                  href={`/${x.media_type}/${x.id}`}
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
      {tab === Tabs.Images && (
        <ImageGrid variant='234' images={person?.images?.profiles} />
      )}
    </>
  )
}
