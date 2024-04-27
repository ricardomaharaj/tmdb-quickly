import type { AppProps } from 'next/app'
import { Header } from '~/components/ui/header'
import '~/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  )
}
