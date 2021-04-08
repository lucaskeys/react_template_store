import { takeLatest, put, all, call } from 'redux-saga/effects';

import userTypes from './userTypes'

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/FirebaseConfig'
import { signInSuccess, signInFailure } from './userActions'

export function* getSnapshotFromUserAuth(userAuth) {
    // wrapping our attempt at an api call inside of a try block
    try {
      const userRef = yield call(createUserProfileDocument, userAuth)
      const userSnapshot = yield userRef.get()
      // put(), puts things back into our regular redux flow
      // This will update our user reducer with the object we are passing as a payload
      yield put(signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      }))
    } catch(error) {
      yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
  try {
    // const userRef = destructured user
    const {user} = yield auth.signInWithPopup(googleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch(error) {
      yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
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

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function*  onGoogleSignInStart() {

  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart)
  ])
}