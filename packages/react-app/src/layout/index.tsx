import React from 'react'
import Div100vh from 'react-div-100vh'
import styled from 'styled-components'
import background from '../assets/images/backgrounds/background.png'
import Footer from './footer'
import Header from './header'
import Main from './main'

interface IProps {
  children: React.ReactNode
}

export default function Layout({ children }: IProps) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

const Container = styled(Div100vh)`
  align-items: center;
  background-image: url(${background});
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (max-width: 540px) {
    width: 100vw;
  }
`
