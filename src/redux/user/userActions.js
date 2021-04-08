import userTypes from './userTypes'

// not used anymore
// export const setCurrentUser = user => ({
//   type: userTypes.SET_CURRENT_USER,
//   payload: user
// })

export const googleSignInStart = () => {
  return {
    type: userTypes.GOOGLE_SIGN_IN_START
  }
}

export const signInSuccess = (user) => {
  return {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
  }
}

export const signInFailure = (error) => {
  return {
    type: userTypes.SIGN_IN_FAILURE,
    payload: error
  }
}


export const emailSignInStart = (emailAndPassword) => {
  return {
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
  }
}



export const checkUserSession = () => {
  return {
    type: userTypes.CHECK_USER_SESSION
  }
}

export const signOutStart = () => {
  return {
    type: userTypes.SIGN_OUT_START
  }
}

export const signOutSuccess = () => {
  return {
    type: userTypes.SIGN_OUT_SUCCESS
  }
}

export const signOutFailure = (error) => {
  return {
    type: userTypes.SIGN_OUT_FAILURE,
    payload: error
  }
}