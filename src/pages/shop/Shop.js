import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { selectCollectionIsFetching, selectCollectionIsLoaded } from '../../redux/shop/shop.selectors'
import { fetchCollectionsStart } from '../../redux/shop/shopActions'


import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/Collection'

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'
import CollectionPageContainer from '../../pages/collection/CollectionContainer'


// New component for loading spinner - these are now being handled by a container from Collections 
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
// const CollectionsPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component {

  // }
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    console.log('route params start', match.path)
    return(
      <div className="shop-page">

        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    )
  }
}
// Handled in our containers
// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectCollectionIsFetching,
//   isCollectionLoaded: selectCollectionIsLoaded
// })

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStart())
  }
}
 
export default connect(null, mapDispatchToProps)(ShopPage);