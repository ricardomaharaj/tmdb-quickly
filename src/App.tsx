import * as Urql from 'urql'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Movie } from './pages/movie'
import { Show } from './pages/tv'
import { Season } from './pages/tv/season'
import { Episode } from './pages/tv/season/episode'
import { Person } from './pages/person'
import { Header } from './comps/header'

const url =
    process.env.NODE_ENV === 'production'
        ? 'https://r8r-gql.herokuapp.com/'
        : 'http://localhost:4000/'

const urqlClient = Urql.createClient({ url })

export function App() {
    return (
        <Urql.Provider value={urqlClient}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
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
                    <Route path='*' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Urql.Provider>
    )
}
