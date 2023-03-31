import { NavBar } from "@/comps/nav-bar"
import { GlobalStateProvider } from "@/state/global"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStateProvider>
        <NavBar />
        <Component {...pageProps} />
      </GlobalStateProvider>
    </>
  )
}
