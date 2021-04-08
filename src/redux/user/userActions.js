import userTypes from './userTypes'


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
