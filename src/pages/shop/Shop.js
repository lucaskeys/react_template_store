import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


// import { selectCollectionIsFetching, selectCollectionIsLoaded } from '../../redux/shop/shop.selectors'
// import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
// import CollectionPage from '../collection/Collection'
import { fetchCollectionsStart } from '../../redux/shop/shopActions'
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'
import CollectionPageContainer from '../../pages/collection/CollectionContainer'


// New component for loading spinner - these are now being handled by a container from Collections 
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
// const CollectionsPageWithSpinner = WithSpinner(CollectionPage)


const ShopPage = ({fetchCollectionsStart, match}) => {

  useEffect(() => {
    fetchCollectionsStart();
    // we pass in fetchCollection - because it will render twice due to the parent component updating the user info - also we are pulling it in from mpaState, so this will not need to be re-rendered 
  }, [fetchCollectionsStart])


  return(
    <div className="shop-page">

      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  )
}
// Handled in our containers
// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectCollectionIsFetching,
//   isCollectionLoaded: selectCollectionIsLoaded
// })

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
  }
}
 
export default connect(null, mapDispatchToProps)(ShopPage);