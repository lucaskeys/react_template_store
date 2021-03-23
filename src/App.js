import React from 'react';
import Homepage from './pages/homepage/Homepage'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ShopPage from './pages/shop/ShopComponent'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Header from './components/header/Header'
import './App.css';

function App() {

  const customHistory = createBrowserHistory();

  return (
    <div>
      <Header/>
      <Router history={customHistory}>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/sign-in" component={SignInSignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
