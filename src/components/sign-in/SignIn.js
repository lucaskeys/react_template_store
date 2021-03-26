import React from 'react';
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { signInWithGoogle } from '../../firebase/FirebaseConfig';
import './SignIn.scss' 

class SignIn extends React.Component {

state = {
  email: '',
  password: ''
}

handleSubmit = (event) => {
  event.preventDefault();

  this.setState({
    email: '',
    password: ''
  })
}

handleChange = (event) => {
  const {value, name} = event.target;

  this.setState({
    [name]: value
  })
}

  render() {
    return (
      <div className="sign-in"> 
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>

          <FormInput 
          name="email" 
          type="email" 
          label="email"
          value={this.state.email} 
          handleChange={this.handleChange}  
          required 
          />

          <FormInput 
          name="password" 
          type="password" 
          label="password"
          value={this.state.password} 
          handleChange={this.handleChange} 
          required 
          />

        <div className="button">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
        </div>
        </form>
      </div>
    )
  }
}

export default SignIn;