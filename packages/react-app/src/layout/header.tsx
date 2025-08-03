import { useState } from 'react'
import styled from 'styled-components'
import { APP_NAME } from '../app/page'
import menuIcon from '../assets/images/icons/icon-menu.png'
import DialogMenu from '../components/dialogs/dialog-menu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <Container>
      <p>{APP_NAME}</p>
      <button className="menu-button" onClick={() => setMenuOpen(true)}>
        <img alt="" src={menuIcon} />
      </button>
      <DialogMenu close={() => setMenuOpen(false)} visible={menuOpen} />
    </Container>
  )
}

const Container = styled.header`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: center;
  padding: 0 24px;
  position: relative;
  width: 100%;

  & > p {
    font-size: 24px;
    font-weight: bold;
  }

  & > button {
    height: 24px;
    left: 24px;
    position: absolute;
    top: 24px;
    width: 24px;

    & > img {
      height: 100%;
      width: 100%;
    }
  }
`
