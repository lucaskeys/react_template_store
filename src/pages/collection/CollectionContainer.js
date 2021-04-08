import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'
import { selectCollectionIsLoaded } from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/WithSpinner'
import CollectionPage from './Collection'

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectCollectionIsLoaded(state)
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage)

export default CollectionPageContainer;