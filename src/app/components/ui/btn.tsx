import { ButtonHTMLAttributes } from "preact"
import { ReactNode } from "preact/compat"

export function Btn({
	isActive,

	className,
	children,

	...attr
}: {
	isActive?: boolean
	children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`
        rounded-xl
        ${isActive ? "bg-slate-700" : "bg-slate-800"}
        disabled:bg-slate-900 disabled:text-slate-400 disabled:hover:bg-slate-900 md:transition-colors md:hover:bg-slate-600
        ${className ?? ""}
      `}
			{...attr}
		>
			{children}
		</button>
	)
}
