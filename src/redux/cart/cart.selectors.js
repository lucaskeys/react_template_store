import { createSelector } from 'reselect';

// this selects just the cart piece of state

// the state in this argument is the state thats being passed in from our function call in mapstate to props
const selectCart = state => state.cart

// const selectUser = state => state.user

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => {
    return cartItems.reduce((accumQty, cartItem) => {
          return accumQty + cartItem.quantity
        }, 0)
  }
)