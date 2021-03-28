import React from 'react';
import Homepage from './pages/homepage/Homepage'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ShopPage from './pages/shop/ShopComponent'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Header from './components/header/Header'
import { auth, createUserProfileDocument } from './firebase/FirebaseConfig'
import { setCurrentUser } from './redux/user/userActions'

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
          <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/sign-in" render={() => this.props.currentUser ? (<Redirect to='/' />)  : (<SignInSignUp />)} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
