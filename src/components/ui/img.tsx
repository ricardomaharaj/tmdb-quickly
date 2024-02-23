export function Img(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  return <img {...props} loading='lazy' alt='' />
}
