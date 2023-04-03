import Card from '@/comps/card'
import { Movie, MovieCredits } from '@/types/movie'
import { api } from '@/util/local-api'
import { tmdbApi } from '@/util/tmdb-api'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string
  const movie = await tmdbApi.getMovie({ id })
  return { props: { movie } }
}

enum Tabs {
  Info = 'Info',
  Cast = 'Cast',
  Crew = 'Crew',
  Images = 'Images',
  Videos = 'Videos',
}

export default function MoviePage({ movie }: { movie: Movie }) {
  const { poster_path, title, release_date, tagline, overview, id } = movie

  const [tab, setTab] = useState<Tabs>(Tabs.Info)

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

  const [credits, setCredits] = useState<MovieCredits>()

  useEffect(() => {
    if (castOrCrewTab) {
      api
        .get<MovieCredits>('movie/credits', { id })
        .then((res) => setCredits(res))
    }
  }, [tab])

  return (
    <>
      <Head>
        {title && <title>{`${title} | TMDB NEXT`}</title>}
        {overview && <meta name='description' content={overview} />}
      </Head>
      <Card
        img={poster_path}
        primary={title}
        secondary={release_date && new Date(release_date).toDateString()}
        tertiary={tagline}
      />
      <div className='row space-x-4'>
        {Object.values(Tabs).map((x) => (
          <button
            className={`${tab === x && 'font-bold'}`}
            onClick={() => setTab(x)}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === Tabs.Info && (
        <>
          {overview && (
            <div className='row'>
              <div className=''>{overview}</div>
            </div>
          )}
        </>
      )}
      {tab === Tabs.Cast && <></>}
    </>
  )
}
