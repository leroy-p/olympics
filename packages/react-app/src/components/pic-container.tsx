import styled from 'styled-components'
import background from '../assets/images/backgrounds/background-pic.png'

interface IProps {
  pic: string
  size: number
}

export default function PicContainer({ pic, size }: IProps) {
  return (
    <Container $size={size}>
      <img alt="" src={pic} />
    </Container>
  )
}

const Container = styled.div<{ $size: number }>`
  border-radius: 50%;
  background-image: url(${background});
  background-size: 100% 100%;
  height: ${({ $size }) => `${$size}px`};
  padding: 2px;
  width: ${({ $size }) => `${$size}px`};

  & > img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
`
