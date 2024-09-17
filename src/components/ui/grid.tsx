import { useAtom } from 'jotai'
import { ImageLink } from '~/components/ui/image-link'
import { VideoCard } from '~/components/ui/video-card'
import { displaySetting } from '~/lib/state'
import { DISPLAY_OPTION } from '~/types/enum'
import { Image, VideoResult } from '~/types/tmdb'

export function CardGrid({ children }: { children?: React.ReactNode }) {
  const [displayOption] = useAtom(displaySetting)

  if (displayOption === DISPLAY_OPTION.Rows) {
    return (
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>{children}</div>
    )
  }

  if (displayOption === DISPLAY_OPTION.Columns) {
    return (
      <div className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
        {children}
      </div>
    )
  }
}

export function EpisodeGrid({ children }: { children?: React.ReactNode }) {
  const [displayOption] = useAtom(displaySetting)

  if (displayOption === DISPLAY_OPTION.Rows) {
    return (
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>{children}</div>
    )
  }

  if (displayOption === DISPLAY_OPTION.Columns) {
    return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4'>
        {children}
      </div>
    )
  }
}

export function MediaGrid({
  variant,
  images,
  videos,
}: {
  variant?: '123' | '234'
  images?: Image[]
  videos?: VideoResult[]
}) {
  if (variant === '123') {
    return (
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {!!images && images.map((x) => <ImageLink x={x} key={x.file_path} />)}
        {!!videos && videos.map((x) => <VideoCard x={x} key={x.key} />)}
      </div>
    )
  }

  if (variant === '234') {
    return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
        {!!images && images.map((x) => <ImageLink x={x} key={x.file_path} />)}
        {!!videos && videos.map((x) => <VideoCard x={x} key={x.key} />)}
      </div>
    )
  }
}
