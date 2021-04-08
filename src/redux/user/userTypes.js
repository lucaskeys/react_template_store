 const userTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  // is combined into one - refactor!!
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  CHECK_USER_SESSION: 'CHECK_USER_SESSION',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',

  // GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
  // GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE',
  // EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
  // EMAIL_SIGN_IN_FAILURE: 'EMAIL_SIGN_IN_FAILURE',
}

export default userTypes;