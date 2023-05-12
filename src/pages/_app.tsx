import type { AppProps } from 'next/app'
import * as Urql from 'urql'

import { Header } from '~/comps/header'
import '~/styles/globals.css'

const url = '/api/gql'

const UrqlClient = Urql.createClient({
  url,
  exchanges: [Urql.cacheExchange, Urql.fetchExchange],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Urql.Provider value={UrqlClient}>
        <div className='col m-2 space-y-2'>
          <Header />
          <Component {...pageProps} />
        </div>
      </Urql.Provider>
    </>
  )
}
