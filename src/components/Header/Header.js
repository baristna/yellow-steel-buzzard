import React from 'react'
import {
  Wrapper,
  Logo,
} from './Header.style'
import logo from '../../assets/logo.svg'

export const Header = () => {
  return (
    <Wrapper>
      <Logo src={logo} />
    </Wrapper>
  )
}
