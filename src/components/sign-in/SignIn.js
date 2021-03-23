import React from 'react';
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
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


          <CustomButton type="submit" value="submit form">SIGN IN</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn;