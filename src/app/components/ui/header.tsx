import { Link } from "./link"

export function Header() {
	return (
		<div className="my-4 flex flex-row justify-center gap-2 text-2xl uppercase md:text-3xl">
			<Link href="/">
				<div>TMDB Quickly</div>
			</Link>
		</div>
	)
}
