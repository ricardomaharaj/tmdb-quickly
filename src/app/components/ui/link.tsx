import { AnchorHTMLAttributes } from "preact"
import { ReactNode } from "preact/compat"

export function Link({
	children,

	...attr
}: {
	children?: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
	return <a {...attr}>{children}</a>
}
