import type { AppProps } from 'next/app'
import '~/styles/globals.css'
import { Urql } from '~/util/urql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Urql>
      <Component {...pageProps} />
    </Urql>
  )
}
