export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToAdd.id
  });

  if(existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    })
  }
  // quantity property gets attached the first time around since this if block wont run when its a new item!
  return [...cartItems, {...cartItemToAdd, quantity: 1}]
}