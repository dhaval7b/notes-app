
import { BrowserRouter as Router  } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import NoteDetail from './pages/NoteDetails'
function App() {

  return (
    <>
      <Router>
        <div className='App'>
          <Switch>
          <Route path="/notes/:id">
              <NoteDetail/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
