import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/CollectionPreview';

import './CollectionsOverview.scss'

const CollectionsOverview = ({collections}) => {
  return(
    <div className="collections-overview">
    {
        collections.map(({id, ...collectionProps}) => {
          return <CollectionPreview key={id} {...collectionProps} />
        })
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps, null)(CollectionsOverview);