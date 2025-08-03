import styled from 'styled-components'
import arrowIcon from '../../assets/images/icons/icon-arrow-down.png'
import removeIcon from '../../assets/images/icons/icon-remove.png'

interface IProps {
  value: string
  placeholder: string
  highlighted?: boolean
  disabled?: boolean
  hidden?: boolean
  onChange: (value: string) => void
}

export default function InputText({ value, placeholder, highlighted, disabled, hidden, onChange }: IProps) {
  return (
    <Input
      $disabled={disabled}
      $hidden={hidden}
      $highlighted={highlighted}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  )
}

const Input = styled.input<{
  $disabled?: boolean
  $hidden?: boolean
  $highlighted?: boolean
}>`
  height: 32px;
  background-color: ${({ $highlighted, theme }) => ($highlighted ? theme.palette.secondary : 'transparent')};
  border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  opacity: ${({ $disabled, $hidden }) => {
    if ($hidden) return 0

    return $disabled ? '0.5' : '1'
  }};
  overflow: hidden;
  padding: 0 8px;
  pointer-events: ${({ $disabled, $hidden }) => ($disabled || $hidden ? 'none' : 'auto')};
  position: relative;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => `${theme.palette.primary}90`};
    font-weight: normal;
  }
`
