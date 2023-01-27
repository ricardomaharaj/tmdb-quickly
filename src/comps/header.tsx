import { Link } from 'react-router-dom'

export function Header() {
    return (
        <>
            <Link to='/' className='row justify-center my-2'>
                <div className='row space-x-2 md:space-x-4 text-3xl md:text-4xl lg:text-5xl'>
                    {'TMDB|QUICKLY'.split('').map((letter, i) => (
                        <div key={i}>{letter}</div>
                    ))}
                </div>
            </Link>
        </>
    )
}
