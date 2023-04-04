import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Card from '@/comps/card'
import { tmdbApi } from '@/util/tmdb-api'

import { CastMember, CrewMember } from '@/types/movie-credits'
import { useRouter } from 'next/router'
import { api } from '@/util/local-api'
import { Movie } from '@/types/movie'
import { MovieCredits } from '@/comps/movie-credits'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string
  const movie = await tmdbApi.movie({ id })
  return { props: { movie } }
}

export enum Tabs {
  Info = 'Info',
  Cast = 'Cast',
  Crew = 'Crew',
  Images = 'Images',
  Videos = 'Videos',
}

export default function MoviePage(props: { movie: Movie }) {
  const { movie } = props

  const {
    id,
    title,
    poster_path,
    overview,
    release_date,
    tagline,
    production_companies,
  } = movie

  const router = useRouter()

  const tab = (router.query.tab as Tabs | undefined) || Tabs.Info

  const query = (router.query.query as string | undefined) || ''
  const page = parseInt((router.query.page as string | undefined) || '1')

  const updateQueries = (update: any) => {
    router.replace({
      pathname: '/movie/[id]',
      query: { id, tab, query, page, ...update },
    })
  }

  const castOrCrewTab = [Tabs.Cast, Tabs.Crew].includes(tab)

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
        href={{
          pathname: '/movie/[id]',
          query: { id },
        }}
      />
      <div className='row space-x-4'>
        {Object.values(Tabs).map((x, i) => (
          <button
            className={`${tab === x && 'font-bold'}`}
            onClick={() => updateQueries({ tab: x })}
            key={i}
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
          <div className='row space-x-2 overflow-scroll'>
            {production_companies?.map(({ name }, i) => (
              <div key={i}>{name}</div>
            ))}
          </div>
        </>
      )}
      {castOrCrewTab && (
        <MovieCredits
          id={id}
          page={page}
          query={query}
          tab={tab}
          updateQueries={updateQueries}
        />
      )}
    </>
  )
}
