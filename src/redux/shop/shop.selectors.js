import { createSelector } from 'reselect';
import memoize from 'lodash.memoize'

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

// turning object of collections into an array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => {
    return collections ? Object.keys(collections).map(key => {
      return collections[key]
    }) : []
  }
)

// this is similar to reselect as it memoizes the function - By wrapping this function is memoize, we're saying that whenever this function gets called and receives collectionUrlParam, I want to memoize the return of this function (in this case we return a selector). If this function gets called again with the same collectionUrlParam, don't rerun this function because we'll return the same value as last time, which we've memoized so just return the selector that's been stored.
export const selectCollection = memoize((collectionUrlParam) => {
  return createSelector(
    [selectCollections],
       // The collectionUrlParam argument is the string value we are passing in from the collection and using that to find the key - collection returns "hats" so COLLECTION_ID['HATS'] = 1 ----- this has now been changed from the COLLECTION_ID to the UID thats being inputted via firebase config 
    collections => collections ? collections[collectionUrlParam] : null
    )
  })


  export const selectCollectionIsFetching = createSelector(
    [selectShop],
    shop => {
      return shop.isFetching
    }
  )

    // this selector is being used in our shop page spinner isLoading prop =  in liu of isFetching true or false because the component is rendered before componentDidMount so its default value is false - no longer loading so no spinner is being rendered while the request is being made - this means the props being passed in are null - so we need to change it to a function that checks to see if the collections are loaded - uses a double-bang (!!) to change the null to a boolean val
  export const selectCollectionIsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
  )