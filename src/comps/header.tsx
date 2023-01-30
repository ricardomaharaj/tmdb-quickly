import { Link } from 'react-router-dom'

export function Header() {
  return (
    <Link to='/' className='row justify-center plain my-3'>
      <div className='text-3xl md:text-4xl lg:text-5xl'>
        T M D B | Q U I C K L Y
      </div>
    </Link>
  )
}
