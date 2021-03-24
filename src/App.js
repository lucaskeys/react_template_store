import React from 'react';
import Homepage from './pages/homepage/Homepage'
import { Switch, Route } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import ShopPage from './pages/shop/ShopComponent'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Header from './components/header/Header'
import { auth } from './components/firebase/FirebaseConfig'
import './App.css';

class App extends React.Component {

  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      })

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    // const customHistory = createBrowserHistory();

    return (
      <div>
        <Header currentUser={this.state.currentUser} />
          <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/sign-in" component={SignInSignUp} />
          </Switch>
      </div>
    );
  }
}

export default App;
