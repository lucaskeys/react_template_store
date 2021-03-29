import React from 'react';

import CollectionItem from '../collection-item/CollectionItem'

import './CollectionPreview.scss'

const CollectionPreview = ({title, items}) => {

  const renderCollection = () => {
    // return items.filter((item, index) => index < 4).map(item => {
      return items.filter((item, index) => index < 4).map((item) => {
      return (
        // <CollectionItem key={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl}/>

        <CollectionItem key={item.id}  item={item} />
      )
    })
  }

  return(
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {renderCollection()}
      </div>
    </div>
  )
}

export default CollectionPreview;