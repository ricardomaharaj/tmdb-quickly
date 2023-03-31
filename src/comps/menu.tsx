import { useGlobalCtx } from "@/state/global"
import Link from "next/link"

export function Menu() {
  const ctx = useGlobalCtx()
  const { menu, setMenu } = ctx.navbar
  return (
    <>
      <div className="row fixed top-0 z-20 h-full w-[80%] bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl drop-shadow-2xl">
        <div className="col w-full p-10">
          <div className="row w-full justify-end">
            <i onClick={() => setMenu(false)} className="bi bi-x-lg text-xl" />
          </div>
          <Link href="/" className="row text-xl font-bold">
            Home
          </Link>
        </div>
      </div>
    </>
  )
}
