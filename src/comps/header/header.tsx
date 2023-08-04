import Link from 'next/link'

export function Header() {
  return (
    <Link href='/' className='row mx-2 my-4 justify-center text-2xl'>
      <header className='space-x-4 uppercase'>
        {'tmdb|next'.split('').map((x, i) => (
          <span key={i}>{x}</span>
        ))}
      </header>
    </Link>
  )
}
