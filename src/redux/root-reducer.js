import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// tells redux persist to use local storage as default
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userReducer';
import cartReducer from './cart/cartReducer';
import directoryReducer from './directory/directoryReducer';
import shopReducer from './shop/shopReducer'

const persistConfig = {
  // start storing from the root
  key: 'root',
  storage,

  // array containing string names of reducers we want to store (persist) - we only need to persist the cart because firestore already saves the user session
  whitelist: ['cart']

}

 const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);