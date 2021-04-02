import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import WithSpinner from '../../components/with-spinner/WithSpinner'

import { updateCollections } from '../../redux/shop/shopActions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/FirebaseConfig'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/Collection'

// New component for loading spinner
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

// match comes from the route props - this is being passed in because the component is being nested inside of a route componnt in our app page
class ShopPage extends React.Component {
  state = {
    loading: true
  }

  // this is the representation of the snapshot of our collections array
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');

    // this will send us the snapshot of our collections array

    // this is what gets our shop data from firebase and converts it to an array of objects
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      // then we update our shop reducer
      updateCollections(collectionsMap);
      this.setState({ loading: false })
    }) 
  }

  render() {
    const { match } = this.props;

    return(
      <div className="shop-page">
        {/* render is a function that uses the parameters to render a component */}
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner 
        isLoading={this.state.loading} 
        {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner 
        isLoading={this.state.loading} 
        {...props} />} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
  }
}
 
export default connect(null, mapDispatchToProps)(ShopPage);