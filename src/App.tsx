import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EpisodePage } from '~/components/episode'
import { MoviePage } from '~/components/movie'
import { PersonPage } from '~/components/person'
import { SearchPage } from '~/components/search'
import { SeasonPage } from '~/components/season'
import { ShowPage } from '~/components/show'
import { Header } from '~/components/ui/header'
import { Urql } from '~/util/urql'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Urql>
        <Routes>
          <Route Component={SearchPage} path='/' />
          <Route Component={MoviePage} path='/movie/:id' />
          <Route Component={ShowPage} path='/tv/:id' />
          <Route Component={SeasonPage} path='/tv/:id/season/:season_number' />
          <Route
            Component={EpisodePage}
            path='/tv/:id/season/:season_number/episode/:episode_number'
          />
          <Route Component={PersonPage} path='/person/:id' />
        </Routes>
      </Urql>
    </BrowserRouter>
  )
}
