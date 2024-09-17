import * as MUI from '@mui/material'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { Btn } from '~/components/ui/btn'
import { useBool } from '~/hooks/bool'
import { displaySetting } from '~/lib/state'
import { DISPLAY_OPTION, DisplayOption } from '~/types/enum'

const displayOptionsMap: Record<string, DisplayOption> = {
  Columns: DISPLAY_OPTION.Columns,
  Rows: DISPLAY_OPTION.Rows,
}

const displayOptionIcons: Record<DisplayOption, string> = {
  [DISPLAY_OPTION.Rows]: 'icon-[ic--round-table-rows]',
  [DISPLAY_OPTION.Columns]: 'icon-[ic--round-view-column]',
}

export function Header() {
  const drawer = useBool(false)
  const [displayOption, setDisplayOption] = useAtom(displaySetting)

  return (
    <div className='my-4 flex flex-row justify-between'>
      <div></div>
      <Link href='/'>
        <div className='ml-10 text-2xl uppercase md:text-3xl'>TMDB Quickly</div>
      </Link>
      <button
        onClick={drawer.setTrue}
        className='mr-4 flex flex-row items-center'
        aria-label='open settings drawer'
      >
        <i className='icon-[ic--round-menu] text-3xl' />
      </button>
      <MUI.Drawer anchor='right' open={drawer.bool} onClose={drawer.setFalse}>
        <div className='flex h-full min-w-60 flex-col bg-slate-900 p-4 text-white'>
          <div className='flex flex-col'>
            <div className='mb-4 text-xl'>Settings</div>
            <div className='mb-4 text-lg'>Grid Display</div>
            <div className='grid grid-cols-2 gap-4'>
              {Object.entries(displayOptionsMap).map(([key, val]) => (
                <Btn
                  key={val}
                  onClick={() => setDisplayOption(val)}
                  isActive={displayOption === val}
                  className='flex flex-row items-center justify-center p-2'
                >
                  <i className={`${displayOptionIcons[val]} mr-2 text-xl`} />
                  {key}
                </Btn>
              ))}
            </div>
          </div>
        </div>
      </MUI.Drawer>
    </div>
  )
}
