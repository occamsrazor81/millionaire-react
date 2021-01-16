import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import components
import Navbar from './components/Navbar';

//import pages
import Home from './pages/Home';
import Error from './pages/Error';
import Options from './pages/Options';
import Highscores from './pages/Highscores';
import Game from './pages/Game';
import EndScreen from './pages/EndScreen';
import NewHighScore from './pages/NewHighScore';
import QuestionList from './pages/QuestionList';
import EditQuestion from './pages/EditQuestion';
import AddNewQuestion from './pages/AddNewQuestion';
import Login from './pages/Login';
import Register from './pages/Register';

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
        <Route path='/question_list'>
          <QuestionList />
        </Route>
        <Route path='/edit_question/:id'>
          <EditQuestion />
        </Route>
        <Route path='/add_question'>
          <AddNewQuestion />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
