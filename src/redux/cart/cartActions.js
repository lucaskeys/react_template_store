import { cartActionTypes } from './cartTypes'

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItemToCart = item => {
  return {
    type: cartActionTypes.ADD_ITEM,
    payload: item
  }
}

export const removeItem = item => {
  return {
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
  }
}

export const removeItemFromCart = item => {
  return {
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
  }
}

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART
})