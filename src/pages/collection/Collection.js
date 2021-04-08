import React from 'react';
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/CollectionItem'
import { selectCollection } from '../../redux/shop/shop.selectors'
import './Collection.scss'

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  console.log("collection Page props from route!", {collection})

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


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {

    collection: selectCollection(ownProps.match.params.collectionId)(state)
  }
}

export default connect(mapStateToProps, null)(CollectionPage);