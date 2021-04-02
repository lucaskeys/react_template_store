import React from 'react'
import './Homepage.scss'
import Directory from '../../components/directory/Directory'
import { HomePageContainer } from './Homepage.styles'


const HomePage = () => {
  return(
  <HomePageContainer className="homepage">
    <Directory />
  </HomePageContainer>
  )
}

export default HomePage;