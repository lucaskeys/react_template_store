import userTypes from './userTypes'

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
      case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state, 
        currentUser: action.payload,
        errorMessage: null
      }
    case userTypes.SIGN_IN_FAILURE:
      return {
        ...state, 
        errorMessage: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;