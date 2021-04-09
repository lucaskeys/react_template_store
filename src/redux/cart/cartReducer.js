import { cartActionTypes } from './cartTypes'
import { addItemToCart } from './cart.utils'
import { removeItemFromCart } from './cart.utils'
import { clearItemFromCart } from './cart.utils'
const INIT_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
        return {
          ...state,
          cartItems: clearItemFromCart(state.cartItems, action.payload)
        } 
    case cartActionTypes.CLEAR_CART:
        return {
          ...state,
          cartItems: []
        }
    default:
      return state;
  }
}

export default cartReducer;