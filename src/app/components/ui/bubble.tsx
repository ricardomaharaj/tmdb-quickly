import { ReactNode } from "preact/compat"

export function Bubble({
	className,
	children,
}: {
	className?: string
	children?: ReactNode
}) {
	return (
		<div className={`rounded-xl bg-slate-800 p-4 ${className ?? ""}`}>
			{children}
		</div>
	)
}
