type Props<T> = {
  currentTab: T
  tabs: T[]
  onTabClicked: (tab: T) => void
  className?: string
}

export function TabBar<T>({
  tabs,
  onTabClicked,
  currentTab,
  className,
}: Props<T>) {
  return (
    <>
      <div className={`row overscroll my-2 space-x-2 ${className}`}>
        {tabs.map((tab, i) => (
          <button
            className={`btn ${
              tab === currentTab ? 'bg-primary-700' : 'bg-primary-800'
            }`}
            onClick={() => onTabClicked(tab)}
            key={i}
          >
            <div>{tab as string}</div>
          </button>
        ))}
      </div>
    </>
  )
}
