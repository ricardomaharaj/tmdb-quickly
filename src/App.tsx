import { createClient as createUrqlClient } from 'urql'
import { Provider as UrqlProvider } from 'urql'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Search } from './pages/search'
import { Movie } from './pages/movie'
import { Show } from './pages/show'
import { Season } from './pages/season'
import { Episode } from './pages/episode'
import { Person } from './pages/person'
import { Header } from './comps/header'

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://r8r-gql.herokuapp.com/'
    : 'http://localhost:4000/'

const urqlClient = createUrqlClient({ url })

export function App() {
  return (
    <BrowserRouter>
      <UrqlProvider value={urqlClient}>
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
      </UrqlProvider>
    </BrowserRouter>
  )
}
