import { ThemeProvider } from 'styled-components'
import ContextProvider from '../context'
import GlobalStyle from './global-style'
import Router from './router'
import { theme } from './theme'
import './i18n'

export default function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Router />
      </ThemeProvider>
    </ContextProvider>
  )
}
