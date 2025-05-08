import { Fragment } from 'preact/jsx-runtime'
import { numGt0 } from '~/util/validation'

export function Frag({
  value,
  children,
}: {
  value?: string | number | boolean
  children?: React.ReactNode
}) {
  if (!value) return <></>
  if (typeof value === 'number' && !numGt0(value)) return <></>
  else return <Fragment>{children ?? value}</Fragment>
}
