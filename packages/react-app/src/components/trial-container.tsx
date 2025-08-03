import { useContext } from 'react'
import styled from 'styled-components'
import editIcon from '../assets/images/icons/icon-edit.png'
import { GameContext } from '../context/game'
import { ITrial } from '../context/game/hook'
import PicContainer from './pic-container'

interface IProps {
  trial: ITrial
  open: () => void
  edit: () => void
}

export default function TrialContainer({ trial, open, edit }: IProps) {
  const { players } = useContext(GameContext)

  function onEdit(event: React.MouseEvent) {
    event.stopPropagation()
    edit()
  }

  const pic = players?.find((player) => player.id === trial.organiserId)?.pic

  return (
    <Container onClick={open}>
      {pic && (
        <div className="content-container">
          <div className="pic-container">
            <PicContainer pic={pic} size={64} />
          </div>
          <p>{trial.name}</p>
          <button className="edit-button" onClick={onEdit}>
            <img alt="" src={editIcon} />
          </button>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: flex-end;
  width: 158px;

  .content-container {
    align-items: center;
    border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 88px;
    justify-content: center;
    position: relative;
    width: 100%;

    .pic-container {
      height: 64px;
      left: calc(50% - 32px);
      position: absolute;
      top: -32px;
      width: 64px;
    }

    & > p {
      font-size: 16px;
      margin-top: 16px;
    }

    .edit-button {
      border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
      border-radius: 50%;
      height: 24px;
      position: absolute;
      right: 4px;
      top: 4px;
      padding: 2px;
      width: 24px;

      & > img {
        height: 100%;
        margin-top: -1px;
        width: 100%;
      }
    }
  }
`
