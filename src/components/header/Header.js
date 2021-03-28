import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import {auth} from '../../firebase/FirebaseConfig'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import './Header.scss'

const Header = ({currentUser, hidden}) => {
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
      <CartIcon />
      </div>
      {
         hidden ? null : <CartDropdown />
      }
    </div>
  )
}

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => {
  return {
    currentUser,
    hidden    
  }
}

export default connect(mapStateToProps)(Header);