import { Btn } from '~/components/ui/btn'
import { FlowRow } from '~/components/ui/flow-row'

const iconMap: Record<string, string> = {
  Movies: 'icon-[ic--outline-movie]',
  Info: 'icon-[ic--outline-short-text]',

  People: 'icon-[ic--twotone-people-alt]',
  Cast: 'icon-[ic--outline-people-alt]',
  Crew: 'icon-[ic--baseline-people-alt]',
  Guests: 'icon-[ic--outline-people-alt]',

  Images: 'icon-[ic--outline-image]',
  Videos: 'icon-[ic--outline-videocam]',

  Shows: 'icon-[ic--outline-tv]',
  Seasons: 'icon-[ic--outline-tv]',
  Episodes: 'icon-[ic--outline-tv]',

  Posters: 'icon-[ic--outline-image]',
  Backdrops: 'icon-[ic--outline-landscape]',
}

export function Taber({
  tabs,
  activeTab,
  onTabClicked,
}: {
  tabs: Array<{ key: string; val: string }>
  activeTab: string
  onTabClicked: (tab: string) => void
}) {
  return (
    <FlowRow>
      {tabs.map(({ key, val }) => (
        <Btn
          className={`flex px-4 py-2 md:px-4 md:py-1`}
          isActive={val === activeTab}
          onClick={() => onTabClicked(val)}
          key={val}
        >
          {iconMap[key] && (
            <i className={`${iconMap[key]} mr-2 mt-0.5 text-xl`} />
          )}
          {key}
        </Btn>
      ))}
    </FlowRow>
  )
}
