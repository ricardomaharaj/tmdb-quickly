import { atomWithStorage } from 'jotai/utils'
import { DISPLAY_OPTION, DisplayOption } from '~/types/enum'

export const displaySetting = atomWithStorage<DisplayOption>(
  'displayOptions',
  DISPLAY_OPTION.Columns,
)
