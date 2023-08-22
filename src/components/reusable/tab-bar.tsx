export function TabBar<T>({
  tabs,
  onTabClicked,
  currentTab,
  className,
}: {
  currentTab: T
  tabs: T[]
  onTabClicked: (tab: T) => void
  className?: string
}) {
  return (
    <>
      <div className={`row overscroll my-2 space-x-2 ${className}`}>
        {tabs.map((tab, i) => (
          <Tab
            tab={tab}
            currentTab={currentTab}
            onTabClicked={onTabClicked}
            key={i}
          />
        ))}
      </div>
    </>
  )
}

function Tab<T>({
  tab,
  currentTab,
  onTabClicked,
}: {
  currentTab: T
  tab: T
  onTabClicked: (tab: T) => void
}) {
  const highlight = currentTab === tab

  return (
    <>
      <button
        className={`btn ${highlight ? 'bg-primary-700' : 'bg-primary-800'}`}
        onClick={() => onTabClicked(tab)}
      >
        <div>{tab as string}</div>
      </button>
    </>
  )
}
