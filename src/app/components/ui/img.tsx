import { ImgHTMLAttributes } from "preact"

export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
	return <img loading="lazy" {...props} />
}
