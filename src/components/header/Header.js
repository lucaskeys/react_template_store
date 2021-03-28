import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {auth} from '../../firebase/FirebaseConfig'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import './Header.scss'

const Header = ({currentUser}) => {
  return(
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo"/>
      </Link>
      <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/contact">CONTACT</Link>
      {
        currentUser ? 
        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        : 
        <Link className="option" to="/sign-in">SIGN IN</Link>
      }
      </div>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(Header);