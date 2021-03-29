import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import CartItem from '../cart-item/CartItem'
import CustomButton from '../custom-button/CustomButton'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cartActions'
import './CartDropdown.scss'

// dispatch property comes from connect since we didnt declare a mapDispatchtoProps
const CartDropdown = ({cartItems, history, dispatch}) => {

  const renderCartItems = () => {
    return cartItems.map(cartItem => {                 
      return (
        <CartItem key={cartItem.id} item={cartItem} />
      )
    })
  }

  return(
    <div className="cart-dropdown">
      <div className="cart-items">
        {   
          cartItems.length ? renderCartItems() : <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <CustomButton onClick={() => {
        history.push('/checkout')
        dispatch(toggleCartHidden())
      }}
        >GO TO CHECKOUT</CustomButton>
    </div>
  )
}

// const mapStateToProps = ({ cart: {cartItems}}) => {
//   return {
//     cartItem: state.cart.cartItems
//     cartItems
//   }
// }

// uses cart selector function inside redux
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));