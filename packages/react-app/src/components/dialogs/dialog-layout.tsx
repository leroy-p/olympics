import Div100vh from 'react-div-100vh'
import styled from 'styled-components'
import background from '../../assets/images/backgrounds/background-dialog.png'
import menuBackground from '../../assets/images/backgrounds/background-menu-dialog.png'

interface IProps {
  children: React.ReactNode
  visible?: boolean
  menu?: boolean
  close: () => void
}

export default function DialogLayout({ children, visible, menu, close }: IProps) {
  return (
    <Container onClick={close} $menu={menu} $visible={visible}>
      <div className="dialog-content" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </Container>
  )
}

const Container = styled(Div100vh)<{ $visible?: boolean; $menu?: boolean }>`
  align-items: center;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background: rgba(13, 13, 13, 0.40);
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: fixed;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  top: 0;
  transition: opacity 200ms ease-in-out;
  width: 100vw;
  z-index: 2;

  * {
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none !important')} ;
  }

  .dialog-content {
    background-image: ${({ $menu }) => ($menu ? `url('${menuBackground}')` : `url('${background}')`)};
    background-size: 100% 100%;
    border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #000000;
    overflow: hidden;
  }
`
