import '@/styles/globals.css'
import { Header } from '@/comps/header'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='col m-2 space-y-2'>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
