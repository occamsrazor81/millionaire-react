import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import pages
import Home from './pages/Home';
import Error from './pages/Error';
import Options from './pages/Options';
import Highscores from './pages/Highscores';
import Game from './pages/Game';
import EndScreen from './pages/EndScreen';

//import components
import Navbar from './components/Navbar';
import NewHighScore from './pages/NewHighScore';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/options'>
          <Options />
        </Route>
        <Route path='/highscores'>
          <Highscores />
        </Route>
        <Route path='/game'>
          <Game />
        </Route>
        <Route path='/endscreen'>
          <EndScreen />
        </Route>
        <Route path='/new_highscore'>
          <NewHighScore />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
