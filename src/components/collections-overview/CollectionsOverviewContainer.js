import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { compose } from 'redux'

import { selectCollectionIsFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/WithSpinner'
import CollectionsOverview from './CollectionsOverview'

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionIsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)


export default CollectionsOverviewContainer;