import Image from 'next/image'
import { lazy, useState } from 'react'
import { gql } from 'urql'
import { usePersonQuery } from '~/components/person/query'
import { Pager } from '~/components/reusable/pager'
import { QueryBar } from '~/components/reusable/query-bar'
import { TabBar } from '~/components/reusable/tab-bar'
import { useParams } from '~/hooks/params'
import { useTimeout } from '~/hooks/timeout'
import { calcAge } from '~/util/calc-age'
import { dateStr } from '~/util/date-str'
import { imageUrls } from '~/util/image-urls'

const Bio = lazy(() => import('./bio'))
const Cast = lazy(() => import('./cast'))
const Crew = lazy(() => import('./crew'))
const Profiles = lazy(() => import('./profiles'))

const tabs = ['Bio', 'Cast', 'Crew', 'Profiles']

const gqlQuery = gql`
  query ($id: String!) {
    person(id: $id) {
      name
      profile_path
      birthday
      deathday
    }
  }
`

const filterMap = {
  movie: 'Movies',
  tv: 'TV Shows',
}

export function PersonPage() {
  const [params, replace] = useParams({
    id: '',
    query: '',
    page: '1',
    tab: 'Bio',
    filter: '',
  })

  const { id, query, tab: curTab, filter } = params
  const page = parseInt(params.page)

  const [res] = usePersonQuery(gqlQuery, { id })
  const person = res.data?.person

  const [debounce, setDebounce] = useState(query)
  useTimeout(() => {
    if (debounce !== query) {
      replace({ query: debounce, page: '1' })
    }
  }, [debounce])

  const setPage = (dir: number) => replace({ page: (page + dir).toString() })

  const showQueryBar = ['Cast', 'Crew'].includes(curTab)
  const showPager = ['Cast', 'Crew', 'Profiles'].includes(curTab)

  const props = { id, query, page, filter }

  return (
    <>
      <div className='m-2 xl:mx-auto xl:max-w-screen-xl'>
        <div className='row rounded-xl bg-primary-800 p-2 lg:p-4'>
          {person?.profile_path && (
            <Image
              src={`${imageUrls.w130h195}${person.profile_path}`}
              className='mr-3 rounded-xl'
              width={110}
              height={0}
              alt=''
            />
          )}
          <div className='col space-y-1'>
            <div>{person?.name}</div>

            {person?.birthday && (
              <div>Age: {calcAge(person.birthday, person.deathday)}</div>
            )}
            {person?.birthday && <div>Born: {dateStr(person.birthday)}</div>}
            {person?.deathday && <div>Died: {dateStr(person.deathday)}</div>}
          </div>
        </div>

        <TabBar
          tabs={tabs}
          currentTab={curTab}
          onTabClicked={(tab) => replace({ tab })}
        />

        {showQueryBar && (
          <QueryBar
            query={query}
            onInputChange={(e) => setDebounce(e.target.value)}
            onClearClick={() => replace({ query: '', page: '1' })}
          />
        )}

        {showQueryBar && (
          <div className='row mb-2 space-x-2'>
            {Object.entries(filterMap).map(([val, title], i) => (
              <button
                className={`btn ${
                  filter === val ? 'bg-primary-700' : 'bg-primary-800'
                }`}
                onClick={() => replace({ filter: val === filter ? '' : val })}
                key={i}
              >
                {title}
              </button>
            ))}
          </div>
        )}

        {curTab === 'Bio' && <Bio {...props} />}
        {curTab === 'Cast' && <Cast {...props} />}
        {curTab === 'Crew' && <Crew {...props} />}
        {curTab === 'Profiles' && <Profiles {...props} />}

        {showPager && (
          <Pager
            page={page}
            onPageDownClick={() => setPage(-1)}
            onPageUpClick={() => setPage(1)}
          />
        )}
      </div>
    </>
  )
}
