import styled from 'styled-components'

interface IProps {
  title: string
}

export default function DialogHeader({ title }: IProps) {
  return (
    <Container>
      <p>{title}</p>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  border-bottom: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 24px;
  width: 100%;

  & > p {
    font-size: 16px;
    text-align: center;
  }
`
