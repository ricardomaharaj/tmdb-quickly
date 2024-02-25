import { getPaginatePos } from '~/server/util/paginate-pos'
import { Image } from '~/types/tmdb'

export function filterImages(args: { images?: Image[]; page?: number }) {
  const images = args.images?.filter((x) => {
    if (!x.iso_639_1) return true
    if (x.iso_639_1 === 'en') return true
    return false
  })

  const { start, end } = getPaginatePos(args.page ?? 1)

  return images?.slice(start, end)
}
