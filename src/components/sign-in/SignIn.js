import React from 'react';
import FormInput from '../form-input/FormInput'
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
          label="Email"
          value={this.state.email} 
          handleChange={this.handleChange}  
          required 
          />
          <label>Email</label>

          <FormInput 
          name="password" 
          type="password" 
          label="Password"
          value={this.state.email} 
          handleChange={this.handleChange} 
          required 
          />
          <label>Password</label>

          <input type="submit" value="submit form" />
        </form>
      </div>
    )
  }
}

export default SignIn;