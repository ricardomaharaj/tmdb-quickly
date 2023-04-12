import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as Urql from 'urql'
import { Header } from './comps/header'
import { Episode } from './pages/episode'
import { Movie } from './pages/movie'
import { Person } from './pages/person'
import { Search } from './pages/search'
import { Season } from './pages/season'
import { Show } from './pages/show'

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://r8r-gql.herokuapp.com/'
    : 'http://localhost:4000/'

const urqlClient = Urql.createClient({
  url,
  exchanges: [Urql.cacheExchange, Urql.fetchExchange]
})

export function App() {
  return (
    <BrowserRouter>
      <Urql.Provider value={urqlClient}>
        <Header />
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/tv/:id' element={<Show />} />
          <Route path='/tv/:id/season/:season_number' element={<Season />} />
          <Route
            path='/tv/:id/season/:season_number/episode/:episode_number'
            element={<Episode />}
          />
          <Route path='/person/:id' element={<Person />} />
          <Route path='*' element={<Search />} />
        </Routes>
      </Urql.Provider>
    </BrowserRouter>
  )
}
