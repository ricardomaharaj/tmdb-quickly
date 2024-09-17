import type { AppProps } from 'next/app'
import { Header } from '~/components/ui/header'
import { Urql } from '~/lib/urql'
import '~/styles/globals.css'

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
