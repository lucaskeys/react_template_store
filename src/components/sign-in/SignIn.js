import React from 'react';
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { connect } from 'react-redux'


// brining in new action that triggers the google sign in start saga
import { googleSignInStart, emailSignInStart } from '../../redux/user/userActions'

import './SignIn.scss' 

class SignIn extends React.Component {

state = {
  email: '',
  password: ''
}

handleSubmit = async (event) => {
  event.preventDefault();
  const { emailSignInStart } = this.props
  const { email, password } = this.state;


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

handleChange = (event) => {
  const {value, name} = event.target;

  this.setState({
    [name]: value
  })
}

  render() {

    const { googleSignInStart } = this.props

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

        <div className="buttons">
          <CustomButton type="submit">SIGN IN</CustomButton>
  
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
        </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);