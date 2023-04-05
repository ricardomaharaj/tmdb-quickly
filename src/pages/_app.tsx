import type { AppProps } from 'next/app'
import '~/styles/globals.css'

import { Header } from '~/comps/header'
import * as Urql from 'urql'

const url = '/api/gql'

const UrqlClient = Urql.createClient({
  url,
  exchanges: [Urql.cacheExchange, Urql.fetchExchange],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Urql.Provider value={UrqlClient}>
        <div className='col m-2'>
          <Header />
          <Component {...pageProps} />
        </div>
      </Urql.Provider>
    </>
  )
}
