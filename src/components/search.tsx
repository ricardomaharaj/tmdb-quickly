import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Btn } from '~/components/ui/btn'
import { Card } from '~/components/ui/card'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Grid } from '~/components/ui/grid'
import { InputBar } from '~/components/ui/input-bar'
import { Pager } from '~/components/ui/pager'
import { searchDoc } from '~/gql/search'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'

const filters: Record<string, string> = {
  Movies: 'movie',
  Shows: 'tv',
  People: 'person',
}

export function SearchPage() {
  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    filter: '',
  })

  const pageInt = parseInt(sp.page)

  const pgUp = () => rplSp({ page: `${pageInt + 1}` })
  const pgDown = () => rplSp({ page: `${pageInt - 1}` })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => rplSp({ query: db, page: '1' }), [db])

  const [res] = useQuery({
    query: searchDoc,
    variables: {
      query: sp.query,
      page: pageInt,
    },
  })

  const { data, error } = res
  const search = data?.search

  useTitle()

  function setFilter(val: string) {
    rplSp({ filter: sp.filter == val ? '' : val, page: '1' })
  }

  const results = search?.results?.filter((x) => {
    if (sp.filter === '') return true
    if (x.media_type === sp.filter) return true
    return false
  })

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <>
      <div className='flex flex-col gap-2'>
        <InputBar
          defaultValue={sp.query}
          onValueChange={(val) => setDb(val)}
          className='text-center text-xl'
        />
        <FlowRow>
          {Object.entries(filters).map(([key, val], i) => (
            <Btn
              withHover
              isActive={sp.filter === val}
              onClick={() => setFilter(val)}
              key={i}
            >
              {key}
            </Btn>
          ))}
        </FlowRow>
        <Grid variant='123'>
          {results?.map((x) => {
            const img = x.poster_path || x.profile_path

            const pri = x.title || x.name
            const sec = sp.query
              ? x.release_date || x.first_air_date
              : undefined
            const ter = x.overview

            const props = { img, pri, sec, ter }

            return (
              <Link href={`/${x.media_type}/${x.id}`} key={x.id}>
                <Card {...props} />
              </Link>
            )
          })}
        </Grid>
        {sp.query && <Pager page={pageInt} pgUp={pgUp} pgDown={pgDown} />}
      </div>
    </>
  )
}
