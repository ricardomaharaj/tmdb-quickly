import type { AppProps } from 'next/app'
import { Header } from '~/components/ui/header'
import '~/styles/globals.css'
import { Urql } from '~/util/urql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <Urql>
          <Header />
          <Component {...pageProps} />
        </Urql>
      </main>
    </>
  )
}
