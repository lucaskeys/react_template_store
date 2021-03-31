import React from 'react';
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/CollectionItem'
import { selectCollection } from '../../redux/shop/shop.selectors'
import './Collection.scss'

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return(
    <div className="collection-page">
    <h2 className="title">{ title }</h2>
      <div className="items">
        {
          items.map(item => {
            return <CollectionItem key={item.id} item={item} />
          })
        }
      </div>
    </div>
  )
}

// state - overall reducer state from the top, and second arg is the ownProps -which is the props of our component being wrapped into our connect which is also URL params
const mapStateToProps = (state, ownProps) => {
  return {
    // adding (state) is necessary because unlike other selectors, this selector needs part of the state depending on the URL parameter - ownProps route is coming from the route params we passed in on the shop page route 
    collection: selectCollection(ownProps.match.params.collectionId)(state)
  }
}

export default connect(mapStateToProps, null)(CollectionPage);