import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { Btn } from '~/components/ui/btn'
import { Card } from '~/components/ui/card'
import { ErrorMsg } from '~/components/ui/error-msg'
import { FlowRow } from '~/components/ui/flow-row'
import { Grid } from '~/components/ui/grid'
import { Img } from '~/components/ui/img'
import { InputBar } from '~/components/ui/input-bar'
import { Pager } from '~/components/ui/pager'
import { personDoc } from '~/gql/person'
import { useSp } from '~/hooks/search-params'
import { useTimeout } from '~/hooks/timeout'
import { useTitle } from '~/hooks/title'
import { imgUrls } from '~/util/img'

import { numGt0 } from '~/util/validation'
import { rmVoiceTag } from '~/util/voice'

const filters: Record<string, string> = {
  Movies: 'movie',
  Shows: 'tv',
}

const tabs = ['Cast', 'Crew', 'Images']

export function PersonPage() {
  const router = useRouter()
  const params = router.query as Record<string, string | undefined>

  const [sp, rplSp] = useSp({
    query: '',
    page: '1',
    tab: 'Cast',
    filter: '',

    id: '',
  })

  const pageInt = parseInt(sp.page)

  function setFilter(val: string) {
    rplSp({ filter: sp.filter == val ? '' : val, page: '1' })
  }

  const pgUp = () => rplSp({ page: `${pageInt + 1}` })
  const pgDown = () => rplSp({ page: `${pageInt - 1}` })

  const [db, setDb] = useState(sp.query)
  useTimeout(() => rplSp({ query: db, page: '1' }), [db])

  const [res] = useQuery({
    query: personDoc,
    variables: {
      id: params.id!,
      query: sp.query,
      page: pageInt,
      filter: sp.filter,
    },
  })

  const { data, error } = res
  const person = data?.person

  useTitle(person?.name)

  const showInputBar = ['Cast', 'Crew'].includes(sp.tab)
  const showFilterBar = showInputBar
  const showPager = ['Cast', 'Crew', 'Images'].includes(sp.tab)

  const cast = person?.combined_credits?.cast?.filter((x) => {
    if (!sp.filter) return true
    if (x.media_type === sp.filter) return true
    return false
  })

  const crew = person?.combined_credits?.crew?.filter((x) => {
    if (!sp.filter) return true
    if (x.media_type === sp.filter) return true
    return false
  })

  if (error) return <ErrorMsg msg={error.message} />

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Card noHover img={person?.profile_path} pri={person?.name} />
        <FlowRow>
          {tabs.map((tab) => (
            <Btn
              withHover
              isActive={sp.tab === tab}
              onClick={() => rplSp({ tab: tab, page: '1' })}
              key={tab}
            >
              {tab}
            </Btn>
          ))}
        </FlowRow>
        {showFilterBar && (
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
        )}
        {showInputBar && (
          <InputBar
            defaultValue={sp.query}
            onValueChange={(val) => setDb(val)}
            className='pl-3'
          />
        )}
        {sp.tab === 'Cast' && (
          <Grid variant='123'>
            {cast?.map((x) => (
              <Link
                href={`/${x.media_type}/${x.id}`}
                key={`${x.id} - ${x.media_type} - ${x.character}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={`${rmVoiceTag(x.character) ?? 'Unknown'} ${
                    numGt0(x.episode_count) ? ` (${x.episode_count} Eps)` : ''
                  }`}
                  ter={x.first_air_date || x.release_date}
                />
              </Link>
            ))}
          </Grid>
        )}
        {sp.tab === 'Crew' && (
          <Grid variant='123'>
            {crew?.map((x) => (
              <Link
                href={`/${x.media_type}/${x.id}`}
                key={`${x.id} - ${x.media_type} - ${x.job}`}
              >
                <Card
                  img={x.poster_path}
                  pri={x.name || x.title}
                  sec={`${x.job ?? 'Unknown'} ${
                    numGt0(x.episode_count) ? ` (${x.episode_count} Eps)` : ''
                  }`}
                  ter={x.first_air_date || x.release_date}
                />
              </Link>
            ))}
          </Grid>
        )}
        {sp.tab === 'Images' && (
          <Grid variant='234'>
            {person?.images?.profiles?.map((x) => (
              <a
                href={`${imgUrls.original}${x.file_path}`}
                target='_blank'
                rel='noreferrer'
                key={x.file_path}
              >
                <Img src={`${imgUrls.w500}${x.file_path}`} />
              </a>
            ))}
          </Grid>
        )}
        {showPager && <Pager page={pageInt} pgUp={pgUp} pgDown={pgDown} />}
      </div>
    </>
  )
}
