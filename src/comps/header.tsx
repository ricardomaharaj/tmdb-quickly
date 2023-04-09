import Link from 'next/link'

export function Header() {
  return (
    <Link href='/' className='row my-2 justify-center'>
      <div className='text-3xl md:text-4xl xl:text-5xl'>T M D B | N E X T</div>
    </Link>
  )
}
