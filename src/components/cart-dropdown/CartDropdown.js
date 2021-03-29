import React from 'react';
import { connect } from 'react-redux'
import CartItem from '../cart-item/CartItem'
import CustomButton from '../custom-button/CustomButton'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import './CartDropdown.scss'

const CartDropdown = ({cartItems}) => {

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
        {renderCartItems()}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
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
const mapStateToProps = (state) => {
  return {
    cartItem: selectCartItemsCount(state)
  }
}

export default connect(mapStateToProps)(CartDropdown);