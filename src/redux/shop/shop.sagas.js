
import { takeEvery, call, put } from 'redux-saga/effects' 
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

    const snapshot = yield collectionRef.get();

    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)

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
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
    );
}