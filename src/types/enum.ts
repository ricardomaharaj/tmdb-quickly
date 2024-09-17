export const DISPLAY_OPTION = {
  Columns: 'Columns',
  Rows: 'Rows',
} as const

export type DisplayOption = keyof typeof DISPLAY_OPTION
