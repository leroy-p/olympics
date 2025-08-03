import { useContext } from 'react'
import styled from 'styled-components'
import { GameContext } from '../../context/game'
import { ITrial } from '../../context/game/hook'
import RankingTable, { ITableRow } from '../ranking-table'
import DialogLayout from './dialog-layout'

interface IProps {
  trial?: ITrial
  visible?: boolean
  close: () => void
}

export default function DialogTrial({ trial, visible, close }: IProps) {
  const { players } = useContext(GameContext)
  const rows: ITableRow[] | undefined = trial?.ranking.map((id, index) => {
    const player = players?.find((value) => value.id === id)

    if (!players || !player) throw new Error('Player not found.')

    return { pic: player.pic, name: player.name, points: players.length - 1 - index }
  })

  return (
    <DialogLayout close={close} visible={visible}>
      {rows && trial && (
        <Container>
          <RankingTable rows={rows} title={trial.name} />
        </Container>
      )}
    </DialogLayout>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100vw - 48px);

  .profile-container {
    align-items: center;
    border-bottom: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    justify-content: flex-start;
    width: 100%;

    & > p {
      font-size: 18px;
    }
  }

  .ranking-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: center;
    width: 100%;

    & > div {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 4px;
      height: 100%;
      justify-content: center;
      width: 50%;

      .label {
        font-size: 16px;
      }

      .value {
        color: ${({ theme }) => theme.palette.secondary};
        font-size: 16px;
      }
    }

    & > div:nth-child(1) {
      border-right: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    }
  }

  .trials-container {
    align-items: center;
    border-top: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    .trial-container {
      align-items: center;
      border-bottom: ${({ theme }) => `dashed 1px ${theme.palette.primary}`};
      display: flex;
      flex-direction: row;
      gap: 4px;
      height: 40px;
      justify-content: center;
      width: 100%;

      .label {
        font-size: 16px;
      }

      .value {
        color: ${({ theme }) => theme.palette.secondary};
        font-size: 16px;
      }
    }

    & > div:nth-last-child(1) {
      border: none;
    }
  }
`
