import Div100vh from 'react-div-100vh'
import styled from 'styled-components'
import loadingImage from '../assets/images/loading.png'

export default function Loader() {
  return (
    <Container>
      <img alt="" src={loadingImage} />
    </Container>
  )
}

const Container = styled(Div100vh)`
  align-items: center;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background: rgba(13, 13, 13, 0.40);
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 3;

  & > img {
    animation: loaderAnimation 1.5s infinite ease-in-out;
    height: 64px;
    width: 64px;
  }

  @keyframes loaderAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
