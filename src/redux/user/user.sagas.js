import { takeLatest, put, all, call } from 'redux-saga/effects';

import userTypes from './userTypes'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/FirebaseConfig'
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './userActions'

// Firebase utilis createUserProfileDocument - it does take an OPTIONAL second parameter of additionalData - where we spread in the additionalData object into the userRef.set
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    // wrapping our attempt at an api call inside of a try block
    try {
      // Firebase utilis createUserProfileDocument happening here -if additionalData is undefined, we will just spread nothing in in our firebase meth
      const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
      const userSnapshot = yield userRef.get()
      // put(), puts things back into our regular redux flow
      // This will update our user reducer with the object we are passing as a payload
      yield put(signInSuccess({
        // this is exactly how we had it in our app.js originally
        id: userSnapshot.id,
        ...userSnapshot.data()
      }))
    } catch(error) {
      yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
  // wrapping our attempt at an api call inside of a try block
  try {
    // const userRef = destructured user
    // this comes back as the user key
    const {user} = yield auth.signInWithPopup(googleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch(error) {
      yield put(signInFailure(error))
    }
}

// destructuing payload and then destructuring the email and password
export function* signInWithEmail({payload: {email, password}}) {
  try {
        // this comes back as the user key
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user)
    const userSnapshot = yield userRef.get()
    // put(), puts things back into our regular redux flow
    yield put(signInSuccess({
      // this is exactly how we had it in our app.js originally
      id: userSnapshot.id,
      ...userSnapshot.data()
    }))
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
 try {
  const userAuth = yield getCurrentUser();
  // if there is no user signed in
  if(!userAuth) {
    return
  }
  if(userAuth) {
    yield getSnapshotFromUserAuth(userAuth)
  }
 } catch(error) {
   yield put(signInFailure(error))
 }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess())
  } catch(error) {
    yield put(signOutFailure(error))
  }
}

export function* signUpNewUser({payload: {displayName, email, password }}) {
  try {

    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    // we pluck off the user using this method, but we destructure the payload to just get the properties above

    // the displayName is the additional data that is being set inside of our firebase createProfilDoc function in firebasecongif - signUpSuccess is passing in an object because that is what we are expecting to recieve an object in our userActions signUpSuccess action creator
    yield put(signUpSuccess({user, additionalData: {displayName}}))
  } catch (error) {
    yield put(signUpFailure(error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* checkUserSessionStart() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, signOut)
}


export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

// listen to google sign in start and then trigger the sign in saga
export function*  onGoogleSignInStart() {
  // going to listen and yield for this action type and take the lastest one - then we trigger the code related to signing in with google 
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signUpStart() {
  yield takeLatest(userTypes.SIGN_UP_START, signUpNewUser)
}

export function* onSignUpSuccess() {
  yield takeLatest(userTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(checkUserSessionStart),
    call(onSignOutStart),
    call(signUpStart),
    call(onSignUpSuccess)
  ])
}