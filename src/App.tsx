import * as Urql from 'urql'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Search } from './Search'
import { Movie } from './Movie'
import { Show } from './Show'
import { Season } from './Season'
import { Episode } from './Episode'
import { Person } from './Person'

const url =
    process.env.NODE_ENV === 'production'
        ? 'https://r8r-gql.herokuapp.com/'
        : 'http://localhost:4000/'

const UrqlClient = Urql.createClient({ url })

export function App() {
    return (
        <BrowserRouter>
            <Urql.Provider value={UrqlClient}>
                <div className='container mx-auto'>
                    <div className='flex flex-col m-2 space-y-2'>
                        <Link
                            to='/'
                            className='flex flex-row w-full justify-center '
                        >
                            <img
                                className='max-h-20 p-2'
                                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
                                alt=''
                            />
                        </Link>
                        <Routes>
                            <Route path='/' element={<Search />} />
                            <Route path='/movie/:id' element={<Movie />} />
                            <Route path='/tv/:id' element={<Show />} />
                            <Route
                                path='/tv/:id/season/:season_number'
                                element={<Season />}
                            />
                            <Route
                                path='/tv/:id/season/:season_number/episode/:episode_number'
                                element={<Episode />}
                            />
                            <Route path='/person/:id' element={<Person />} />
                            <Route path='*' element={<Search />} />
                        </Routes>
                    </div>
                </div>
            </Urql.Provider>
        </BrowserRouter>
    )
}
