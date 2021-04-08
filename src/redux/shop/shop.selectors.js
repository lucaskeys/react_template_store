import { createSelector } from 'reselect';
import memoize from 'lodash.memoize'

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)


export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => {
    return collections ? Object.keys(collections).map(key => {
      return collections[key]
    }) : []
  }
)


export const selectCollection = memoize((collectionUrlParam) => {
  return createSelector(
    [selectCollections],

    collections => collections ? collections[collectionUrlParam] : null
    )
  })


  export const selectCollectionIsFetching = createSelector(
    [selectShop],
    shop => {
      return shop.isFetching
    }
  )


  export const selectCollectionIsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
  )