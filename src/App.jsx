
import { BrowserRouter as Router  } from 'react-router-dom';

import { Switch, Route, Redirect  } from 'react-router-dom';
import Home from './Home'
import NoteDetails from './pages/NoteDetails';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import ProtectedRoute  from  './components/ProtectedRoute';
import { Container } from '@mui/material';
function App() {

  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Container maxWidth="lg" sx={{padding: {xs: 2, md: 4}}}>
          <div className='App'>
            <Switch>
              <ProtectedRoute path="/notes/:id" component={NoteDetails} />
              <ProtectedRoute exact path="/notes" component={Home} />
              <Route path="/login" component={Login}/>
              <Route path="/">
                <Redirect to="/notes" />
              </Route>
            </Switch>
          </div>
        </Container>
      </Router>
    </>
  )
}

export default App