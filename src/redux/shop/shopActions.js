import shopActionTypes from './shopTypes';

export const fetchCollectionsStart = () => {
  return {
    type: shopActionTypes.FETCH_COLLECTIONS_START,
  }
}

export const fetchCollectionsSuccess = collectionsMap => {
  return {
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
  }
}

export const fetchCollectionsFailure = errorMessage => {
  return {
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
  }
}

export const fetchCollectionsStartAsync = () => {    
  return dispatch => {

  }
}