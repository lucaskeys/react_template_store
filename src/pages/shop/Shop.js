import React from 'react';
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/Collection'

import { updateCollections } from '../../redux/shop/shopActions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/FirebaseConfig'

// match comes from the route props - this is being passed in because the component is being nested inside of a route componnt in our app page
class ShopPage extends React.Component {

  // this is the representation of the snapshot of our collections array
  unsubscribeFromSnapshot = null;

  componentDidMount() {

    const { updateCollections } = this.props

    const collectionRef = firestore.collection('collections');

    // this will send us the snapshot of our collections array
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      return updateCollections(collectionsMap)
    }) 
  }

  render() {

    const { match } = this.props;

    return(
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
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