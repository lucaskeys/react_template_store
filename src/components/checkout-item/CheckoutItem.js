import React from 'react';
import { connect } from 'react-redux'
import { removeItemFromCart, addItemToCart, removeItem } from '../../redux/cart/cartActions'
import './CheckoutItem.scss'

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
  const { name, imageUrl, price, quantity} = cartItem
  return(
    <div className="checkout-item">
      <div className="image-container">
        <img alt="item" src={imageUrl}/>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    clearItem: (item) => dispatch(removeItemFromCart(item)),
    addItem: (item) => dispatch(addItemToCart(item)),
    removeItem: (item) => dispatch(removeItem(item))
  }
}

export default connect(null, mapDispatchToProps)(CheckoutItem);