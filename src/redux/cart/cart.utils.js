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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToRemove.id
  });

  // if cartItem.quantity is 1 - its the last one in the cart, then remove the item entirely
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => {
      return cartItem.id !== cartItemToRemove.id
    })
  }

  // else just find the cartItem and see if it matches the intented item to remove, then remove 1
  return cartItems.map(cartItem => {
    return cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} 
    : cartItem
  })
}


export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => {
   return cartItem.id !== cartItemToRemove.id
 })
}