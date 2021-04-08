import React from 'react';
import CollectionItem from '../collection-item/CollectionItem'
import { withRouter } from 'react-router-dom'
import './CollectionPreview.scss'

const CollectionPreview = ({title, items, match, routeName, history, id}) => {

  console.log('CollectionsPreview other props HERE!',)

  const renderCollection = () => {
   
      return items.filter((item, index) => index < 4).map((item) => {
      return (

        <CollectionItem key={item.id}  item={item} />
      )
    })
  }

  return(
    <div className="collection-preview">
      <h1 className="title" onClick={() => history.push(`${match.url}/${routeName}`)}>{title.toUpperCase()}</h1>
      <div className="preview">
        {renderCollection()}
      </div>
    </div>
  )
}


export default withRouter(CollectionPreview);