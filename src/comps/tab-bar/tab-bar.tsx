type Props = {
  tabs: string[]
  setTab: (tab: string) => void
}

export function TabBar({ tabs, setTab }: Props) {
  return (
    <>
      <div className='row my-2 space-x-2 overflow-scroll'>
        {tabs.map((tab, i) => (
          <button
            className='row border-2 px-2'
            onClick={() => setTab(tab)}
            key={i}
          >
            <div>{tab}</div>
          </button>
        ))}
      </div>
    </>
  )
}
