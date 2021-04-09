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

// userCredentials - referes to email and password, and then the display name - passing in all three as an object called userCredentials 
export const signUpStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_START,
  payload: userCredentials
})

// this is an object that has the created user from the firestore create and the additional data - after the createUserWithEmailAndPassword - it returns a user object with the email and pass, but we also need to pass it the display name - because this createUserWithEmailAndPassword is a google method that only gives back a user object with email and password only - so we have to add it to the doc
export const signUpSuccess = ({user, additionalData}) => ({
  type: userTypes.SIGN_UP_SUCCESS,
  // the userObject is really {user: {password, email}, additionalData: {value being passed in from signUpSucessSaga - displayname being destructured in signUpSuccess saga}}
  payload: {user, additionalData} 
})

export const signUpFailure = (error) => ({
  type: userTypes.SIGN_UP_FAILURE,
  payload: error 
})