import { LocationProvider, Route, Router } from 'preact-iso'
import { EpisodePage } from '~/components/episode'
import { MoviePage } from '~/components/movie'
import { PersonPage } from '~/components/person'
import { SearchPage } from '~/components/search'
import { SeasonPage } from '~/components/season'
import { ShowPage } from '~/components/show'
import { Header } from '~/components/ui/header'
import { Urql } from '~/lib/urql'

import '~/tailwind.css'

export function App() {
  return (
    <>
      <Header />
      <Urql>
        <LocationProvider>
          <Router>
            <Route path='/' component={SearchPage} />
            <Route path='/movie/:id' component={MoviePage} />
            <Route path='/tv/:id' component={ShowPage} />
            <Route
              path='/tv/:id/season/:season_number'
              component={SeasonPage}
            />
            <Route
              path='/tv/:id/season/:season_number/episode/:episode_number'
              component={EpisodePage}
            />
            <Route path='/person/:id' component={PersonPage} />
          </Router>
        </LocationProvider>
      </Urql>
    </>
  )
}
