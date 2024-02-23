import Link from 'next/link'

export function Header() {
  return (
    <>
      <Link href='/' className='mb-4 mt-4 flex flex-row justify-center'>
        <div className='text-2xl uppercase md:text-3xl'>TMDB Quickly</div>
      </Link>
    </>
  )
}
