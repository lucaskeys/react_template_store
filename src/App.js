import React from 'react';
import Homepage from './pages/homepage/Homepage'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ShopPage from './pages/shop/ShopComponent'
import './App.css';

function App() {

  const customHistory = createBrowserHistory();

  return (
    <div>
      <Router history={customHistory}>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
