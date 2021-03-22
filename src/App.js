import React from 'react';
import Homepage from './pages/homepage/Homepage'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import './App.css';

const HatsPage = () => {
  return (
    <div>
      <h1>Hat</h1>
    </div>
  )
}

function App() {

  const customHistory = createBrowserHistory();

  return (
    <div>
      <Router history={customHistory}>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/hats" component={HatsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
