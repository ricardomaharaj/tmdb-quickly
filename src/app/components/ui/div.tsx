import { numGt0 } from '~/app/util/validation'

export function Div({
  value,
  children,

  ...attr
}: {
  value?: string | number | boolean
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  if (!value) return <></>
  if (typeof value === 'number' && !numGt0(value)) return <></>
  else return <div {...attr}>{children ?? value}</div>
}
