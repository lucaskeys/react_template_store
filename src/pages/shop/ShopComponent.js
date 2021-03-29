import React from 'react';
import SHOP_DATA from './shopData';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';

class ShopPage extends React.Component {
  state = {
    collections: SHOP_DATA
  }

  render() {

    const {collections} = this.state;
    return(
      <div className="shop-page">
        {
          collections.map(({id, ...collectionProps}) => {
            return <CollectionPreview key={id} {...collectionProps} />
          })
        }
      </div>
    )
  }
}

export default ShopPage;