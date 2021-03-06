import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { signOutStart } from '../../redux/user/userActions'

import styled from 'styled-components'
import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer } from './Header.styles'

const Text = styled.div`
  color: red;
  font-size: 28px;
  border: ${({isActive}) => isActive ? '1px solid black' : '3px dotted red'}
`


const Header = ({currentUser, hidden, signOutStart}) => {
  return(
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo"/>
      </LogoContainer>
      <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      {/* can change the type of component tag to any HTML tag */}
      <OptionLink to="/contact">CONTACT</OptionLink>
      {
        currentUser ? 
        <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
        : 
        <OptionLink to="/sign-in">SIGN IN</OptionLink>
      }
      <CartIcon />
      </OptionsContainer>
      {
         hidden ? null : <CartDropdown />
      }
    </HeaderContainer>
  )
}

const mapStateToProps= createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);