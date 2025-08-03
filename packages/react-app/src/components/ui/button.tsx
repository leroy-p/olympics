import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export default function Button({ children, disabled, onClick }: IProps) {
  return (
    <Container onClick={onClick} $disabled={disabled}>
      {children}
    </Container>
  )
}

const Container = styled.button<{ $disabled?: boolean }>`
  cursor: pointer;
  background: linear-gradient(84deg, #bb1e79 -5.42%, #104feb 113.41%);
  border-radius: 24px;
  box-shadow: 0 0 20px 0 rgba(160, 38, 139, 0.40);
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  padding: 0 16px;
  opacity: ${({ $disabled }) => ($disabled ? '0.5' : '1')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  text-transform: uppercase;
  width: 140px;
`
