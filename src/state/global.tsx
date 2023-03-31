import { useNavBar } from "@/state/header"
import { useSearch } from "@/state/search"
import { createContext, ReactNode, useContext } from "react"

type TGlobalState = {
  search: ReturnType<typeof useSearch>
  navbar: ReturnType<typeof useNavBar>
}

const GlobalState = createContext<TGlobalState | null>(null)

export const useGlobalCtx = () => useContext(GlobalState)!

export function GlobalStateProvider({ children }: { children?: ReactNode }) {
  const val: TGlobalState = {
    search: useSearch(),
    navbar: useNavBar(),
  }
  return <GlobalState.Provider value={val}>{children}</GlobalState.Provider>
}
