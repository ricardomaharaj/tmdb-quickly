type Props<T> = {
  tabs: Readonly<T[]>
  setTab: (tab: T) => void
}

export function TabBar<T>(props: Props<T>) {
  const { tabs, setTab } = props
  return (
    <>
      <div className='row my-2 space-x-2 overflow-scroll'>
        {tabs.map((tab, i) => (
          <button
            className='row border-2 px-2'
            onClick={() => setTab(tab)}
            key={i}
          >
            <div>{tab as string}</div>
          </button>
        ))}
      </div>
    </>
  )
}
