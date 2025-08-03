import { createGlobalStyle } from 'styled-components'
import afacadBold from '../assets/fonts/Afacad-Bold.ttf'
import afacadRegular from '../assets/fonts/Afacad-Regular.ttf'
import { ITheme } from './theme'

const GlobalStyle = createGlobalStyle<{ theme: ITheme }>`
  @font-face {
    font-family: "Afacad";
    src: url("${afacadRegular}");
    font-weight: normal;
  }

  @font-face {
    font-family: "Afacad";
    src: url("${afacadBold}");
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.palette.primary};
    font-family: 'Afacad', sans-serif;
    letter-spacing: normal;
    line-height: normal;
    margin: 0;
  }

  p.gold {
    color: ${({ theme }) => theme.palette.gold} !important;
  }

  p.silver {
    color: ${({ theme }) => theme.palette.silver} !important;
  }

  p.bronze {
    color: ${({ theme }) => theme.palette.bronze} !important;
  }

  p.error {
    color: ${({ theme }) => theme.palette.error} !important;
  }

  a {
    cursor: pointer;
    font-family: 'Afacad', sans-serif;
    text-decoration: none;
  }

  button {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.palette.primary};
    cursor: pointer;
    font-family: 'Afacad', sans-serif;
    outline:none;
    padding: 0;
  }

  input {
    color: ${({ theme }) => theme.palette.primary};
    border-radius: 0;
  }

  input:focus {
    outline: none;
  }

  textarea:focus {
    outline: none;
  }

  select {
    appearance: none;
    color: ${({ theme }) => theme.palette.primary};
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`

export default GlobalStyle
