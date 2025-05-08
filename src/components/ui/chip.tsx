import { Bubble } from '~/components/ui/bubble'

export function IconChip({
  icon,
  label,

  className,
}: {
  icon: string
  label: string

  className?: string
}) {
  return (
    <Bubble
      className={`flex max-w-fit flex-row items-center gap-2 px-3 py-2 ${className || ''}`}
    >
      <i className={`${icon} text-xl`} />
      <span>{label}</span>
    </Bubble>
  )
}
