import React from 'react';

import { signUpStart } from '../../redux/user/userActions'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/CustomButton'
import FormInput from '../form-input/FormInput';

import './SignUp.scss';

class SignUp extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:  '',
    errors: []
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const {displayName, email, password, confirmPassword} = this.state;
    if(password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    signUpStart({displayName, email, password})
   
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state;

    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput 
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput 
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput 
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput 
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);