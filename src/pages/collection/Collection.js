import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/CollectionItem'
import { selectCollection } from '../../redux/shop/shop.selectors'
import './Collection.scss'

import { firestore } from '../../firebase/FirebaseConfig'

const CollectionPage = ({ collection }) => {

  // useEffect(() => {

  //     console.log('I am subscribing')
  //     const unsubscribeFromCollections = firestore.collection('collection').onSnapshot(async snapshot => {
  //       console.log(snapshot)
  //     })
  //     // this is called a cleanup function and will replicate componentWillUnmount() {}
  //   return () => {
  //     console.log('I am unsubscribing')
  //     unsubscribeFromCollections()
  //    }
  //   }, [])

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

// state - overall reducer state from the top, and second arg is the ownProps -which is the props of our component being wrapped into our connect which is also URL params
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    // adding (state) is necessary because unlike other selectors, this selector needs part of the state depending on the URL parameter - ownProps route is coming from the route params we passed in on the shop page route 

    // this is using the incoming collectionId from the shop page as a route prop from the shop route component - we are ussing the route param id prop that is listed in the previous shop page and using this to searcht the collections via a selector function and storing that inside of our collection property to use in our component 

    // because our selector is returning a createSelector call inside of the selectCollection function, we need to also pass it the state
    collection: selectCollection(ownProps.match.params.collectionId)(state)
  }
}

export default connect(mapStateToProps, null)(CollectionPage);