import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Homepage from './pages/homepage/Homepage'
import ShopPage from './pages/shop/Shop'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Checkout from './pages/checkout/Checkout'

import Header from './components/header/Header'


import { selectCurrentUser } from './redux/user/user.selectors'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    // const { collectionsArray } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     creator method to set the current user object in redux reducer
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //           ...snapShot.data()
    //       })
    //     });
    //   }
    //   setCurrentUser(userAuth)
    //   //  we are doing collections.array.map to map over the array to generate a new one without the link or id properties in our colelctions because we want firestore to generate those for us

    //    // this is having to do with populating the firesotre 
    //   // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
    // })
  };

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
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/sign-in" render={() => this.props.currentUser ? (<Redirect to='/' />)  : (<SignInSignUp />)} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser

})



export default connect(mapStateToProps, null)(App);
