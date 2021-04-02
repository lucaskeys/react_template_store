import shopActionTypes from './shopTypes';

export const updateCollections = (collectionsMap) => {
  return {
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
  }
}