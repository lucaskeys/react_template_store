// comes from effect library in redux and listens for every action of a specific type we pass in to it
//  call is the effect inside the gen function that invokes the method
// put is the saga effect for creating actions - exactly like dispatch but we have to yield it
import { takeEvery, call, put, all } from 'redux-saga/effects' 
import shopActionTypes from './shopTypes'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/FirebaseConfig'

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shopActions'

export function* fetchCollectionsAsync() {
  yield console.log('I am fired')

  try {
    const collectionRef = firestore.collection('collections');
    // instead of getting a snapshot in the callback function of .get - we get it back at the const - values goes into the yield and is set at the snapshot - very similar to async await
    const snapshot = yield collectionRef.get();
    // we yield this just in case this call takes longer than we expect - call syntax is just a method that takes some function as its first argument, and then second arg is the parameters
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    // dispatches out an object just like a normal dispacth 
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch(error) {
    yield put(fetchCollectionsFailure(error.message))
  }

  // return dispatch => {
  //   
  //   collectionRef.get().then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
  //   dispatch(fetchCollectionsSuccess(collectionsMap))
  //  }).catch(error => {
  //   dispatch(fetchCollectionsFailure(error))
  //  })
  // }
}

export function* fetchCollectionsStart() {
  // Second param is a generator function that will run in response to the takeEvery listener
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync
    );
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
} 