import { SeasonEpisode } from '~/types/tmdb'
import { genRuntimeStr } from '~/util/runtime-str'
import { toDateStr } from '~/util/to-date-str'

export function genEpTitleStr(ep: SeasonEpisode, season_number: number) {
  let tag = 'S'
  tag += `${season_number}`.padStart(2, '0') + 'E'
  if (ep.episode_number) {
    tag += `${ep.episode_number}`.padStart(2, '0')
  }

  if (ep.air_date) {
    tag += ` | ${toDateStr(ep.air_date)}`
  }

  if (ep.runtime) {
    tag += ` | ${genRuntimeStr(ep.runtime)}`
  }

  return tag
}
