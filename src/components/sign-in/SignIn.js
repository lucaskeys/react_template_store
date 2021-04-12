import React, { useState } from 'react';
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { connect } from 'react-redux'


// brining in new action that triggers the google sign in start saga
import { googleSignInStart, emailSignInStart } from '../../redux/user/userActions'

import './SignIn.scss' 

const SignIn = ({emailSignInStart, googleSignInStart}) => {

const [ userCredentials, setCredentials ] = useState({email: '', password: ''})

const { email, password } = userCredentials;

const handleSubmit = async (event) => {
  event.preventDefault();

  // can destructure a useState object 

  emailSignInStart(email, password)

  // No more setState - redux will handle the state with Saga from now on
  // try {
  //   await auth.signInWithEmailAndPassword(email, password);
  //   this.setState({
  //     email: '',
  //     password: ''
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}

const handleChange = (event) => {
  const {value, name} = event.target;

  setCredentials({
    ...userCredentials, [name]: value
  })
}

    return (
      <div className="sign-in"> 
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>

          <FormInput 
          name="email" 
          type="email" 
          label="email"
          value={email} 
          handleChange={handleChange}  
          required 
          />

          <FormInput 
          name="password" 
          type="password" 
          label="password"
          value={password} 
          handleChange={handleChange} 
          required 
          />

        <div className="buttons">
          <CustomButton type="submit">SIGN IN</CustomButton>
          {/* need the type button else because the button is part of the form element, it will auto trigger an onSubmit  */}
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
        </div>
        </form>
      </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);