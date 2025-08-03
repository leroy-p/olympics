import styled from 'styled-components'
import arrowIcon from '../../assets/images/icons/icon-arrow-down.png'
import removeIcon from '../../assets/images/icons/icon-remove.png'

interface IProps {
  value: number
  options: Array<{ label: string; value: number }>
  placeholder: string
  highlighted?: boolean
  className?: string
  disabled?: boolean
  hidden?: boolean
  removeEnabled?: boolean
  onChange: (value: number) => void
}

export default function Dropdown({
  value,
  options,
  placeholder,
  highlighted,
  disabled,
  hidden,
  className,
  removeEnabled,
  onChange,
}: IProps) {
  return (
    <Container
      $disabled={disabled}
      $empty={!value}
      $hidden={hidden}
      $highlighted={highlighted}
      $removeEnabled={removeEnabled}
    >
      <select className={className} onChange={(event) => onChange(Number.parseInt(event.target.value))} value={value}>
        <option disabled value={0}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value && removeEnabled ? (
        <button onClick={() => onChange(0)}>
          <img alt="" src={removeIcon} />
        </button>
      ) : (
        <img alt="" src={arrowIcon} />
      )}
    </Container>
  )
}

const Container = styled.div<{
  $disabled?: boolean
  $hidden?: boolean
  $highlighted?: boolean
  $empty?: boolean
  $removeEnabled?: boolean
}>`
  height: 32px;
  background-color: ${({ $highlighted, theme }) => ($highlighted ? theme.palette.secondary : 'transparent')};
  border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
  border-radius: 10px;
  opacity: ${({ $disabled, $hidden }) => {
    if ($hidden) return 0

    return $disabled ? '0.5' : '1'
  }};
  overflow: hidden;
  pointer-events: ${({ $disabled, $hidden }) => ($disabled || $hidden ? 'none' : 'auto')};
  position: relative;
  width: 100%;

  & > select {
    background: transparent;
    border: none;
    color: ${({ $highlighted, $empty, theme }) => {
      if ($highlighted) return $empty ? `${theme.palette.primary}90` : theme.palette.primary

      return $empty ? `${theme.palette.secondary}90` : theme.palette.secondary
    }};
    font-size: 14px;
    font-weight: ${({ $empty }) => ($empty ? 'normal' : 'bold')};
    height: 100%;
    opacity: ${({ $disabled }) => ($disabled ? '0.5' : '1')};
    padding: 0 8px;
    pointer-events: ${({ $disabled, $empty, $removeEnabled }) => ($disabled || (!$empty && $removeEnabled) ? 'none' : 'auto')};
    width: 100%;

    & > option {
      background-color: #3b0c19;
      color: #ffffff;
    }

    &.gold {
      color: ${({ $empty, theme }) => ($empty ? `${theme.palette.gold}90` : theme.palette.gold)};
    }

    &.silver {
      color: ${({ $empty, theme }) => ($empty ? `${theme.palette.silver}90` : theme.palette.silver)};
    }

    &.bronze {
      color: ${({ $empty, theme }) => ($empty ? `${theme.palette.bronze}90` : theme.palette.bronze)};
    }
  }

  & > img {
    height: 8px;
    pointer-events: none;
    position: absolute;
    right: 8px;
    top: 12px;
    width: auto;
  }

  & > button {
    height: 12px;
    pointer-events: none;
    position: absolute;
    right: 8px;
    top: 8px;
    width: 12px;

    & > img {
      height: 100%;
      width: 100%;
    }
  }
`
