import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cartActions'
import { createStructuredSelector } from 'reselect'

// this is the external selector function
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import './CartIcon.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return(
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  )
}

// const cartItemCounter = (items) => {
//   return items.reduce((accumQty, cartItem) => {
//     return accumQty + cartItem.quantity
//   }, 0)
// }

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);