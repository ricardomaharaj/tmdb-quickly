import { Menu } from "@/comps/menu"
import { useGlobalCtx } from "@/state/global"
import { useEffect, useRef } from "react"

export function NavBar() {
  const ctx = useGlobalCtx()
  const { query, setQuery } = ctx.search
  const { search, setSearch } = ctx.navbar
  const { menu, setMenu } = ctx.navbar

  return (
    <>
      {menu && <Menu />}
      <div className="col fixed left-0 right-0 top-0 z-10 w-full shadow-xl">
        <div className="col bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 text-white">
          <div className="row justify-between">
            <div className="row">
              <button onClick={() => setMenu(true)}>
                <i className="bi bi-list text-xl" />
              </button>
              <div className="ml-2 text-xl font-bold">TMDB</div>
            </div>
            <button onClick={() => setSearch(!search)}>
              <i className={`bi ${search ? "bi-x-lg" : "bi-search"} text-lg`} />
            </button>
          </div>
        </div>
        {search && (
          <div className="row">
            <input
              type="text"
              className="w-full p-2 outline-none"
              defaultValue={query}
              onKeyDown={(e) =>
                e.key === "Enter" && setQuery(e.currentTarget.value)
              }
            />
          </div>
        )}
      </div>
      <div className={`${search ? "mt-32" : "mt-24"}`} />
    </>
  )
}
