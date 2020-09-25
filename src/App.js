import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';
import MainPage from './MainPage';
import NavBar from './NavBar';
import Characters from './Characters';
import Comics from './Comics';
import Stories from './Stories';
import CharacterDetails from './CharacterDetails';
import Favorites from './Favorites';
import ComicDetails from './ComicDetails';

function App() {
  return (
    <Router>
      <div className="App__container">
      <NavBar />
      <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/character/:characterId' component={CharacterDetails} />
      <Route path='/characters' component={Characters} />
      <Route  path='/comic/:comicId' component={ComicDetails} />
      <Route  path='/comics' component={Comics} />
      <Route  path='/stories' component={Stories} />
     <Route path='/favorites' component={Favorites} /> 
      </Switch>
      </div>
    </Router>
  );
}

export default App;
