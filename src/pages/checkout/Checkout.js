import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CheckoutItem from '../../components/checkout-item/CheckoutItem'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import './Checkout.scss'

const CheckOut = ({cartItems, total}) => {

  const cartTotal = () => {
    return cartItems.map(cartItem => {
      return <CheckoutItem cartItem={cartItem} key={cartItem.id} />
    })
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
        <span>Product</span>
        </div>
        <div className="header-block">
        <span>Description</span>
        </div>
        <div className="header-block">
        <span>Quantity</span>
        </div>
        <div className="header-block">
        <span>Price</span>
        </div>
        <div className="header-block">
        <span>Remove</span>
        </div>
      </div>
      {
        cartTotal()
      }
      <div className="total">
      <span>TOTAL: ${total}</span>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps, null)(CheckOut);