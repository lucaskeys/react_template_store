import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Homepage from './pages/homepage/Homepage'
import ShopPage from './pages/shop/Shop'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Checkout from './pages/checkout/Checkout'

import Header from './components/header/Header'

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/FirebaseConfig'

import { setCurrentUser } from './redux/user/userActions'
import { selectCurrentUser } from './redux/user/user.selectors'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { collectionsArray } = this.props;
    const {setCurrentUser} = this.props;

    // auth comes from firebase - auth library - give the userAuth object and listen to all all the userAuth objects that onAuthStateChange will give us - this userAuth object is stored in the firestore user auth database table - authentication stores user info when they login/sign in - this userAuth contains the UID assigned via firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

          //  this onSnapshot method is coming from our firebase config - createUserProfileDocument function
          // onSnapShot is a listener that listens for whenver the snapshot changes - whenever the document.snapshot object updates - it will pass the snapshot into the listener - then call the setCurrentUser action creator method to set the current user object in redux reducer
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth)
      //  we are doing collections.array.map to map over the array to generate a new one without the link or id properties in our colelctions because we want firestore to generate those for us

       // this is having to do with populating the firesotre but we only want to do this one time, so commenting out the code so it doesnt run again
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
    })
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

  // this is having to do with populating the firesotre but we only want to do this one time, so commenting out the code so it doesnt run again
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
