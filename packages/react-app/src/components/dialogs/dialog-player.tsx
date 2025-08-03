import styled from 'styled-components'
import { IPlayer, ITrial } from '../../context/game/hook'
import { useI18n } from '../../hooks/use-i18n'
import { getTextClassName } from '../../utils/utils'
import PicContainer from '../pic-container'
import DialogHeader from './dialog-header'
import DialogLayout from './dialog-layout'

interface IProps {
  player?: IPlayer
  rank: number
  trials: ITrial[]
  visible?: boolean
  close: () => void
}

export default function DialogPlayer({ player, rank, trials, visible, close }: IProps) {
  const { t } = useI18n()

  return (
    <DialogLayout close={close} visible={visible}>
      {player && (
        <Container>
          <DialogHeader title={t('dialog.player.title')} />
          <div className="profile-container">
            <PicContainer pic={player.pic} size={88} />
            <p>{player.name}</p>
          </div>
          <div className="ranking-container">
            <div>
              <p className="label">{t('common.ranking')}:</p>
              <p className={`value ${getTextClassName(rank)}`}>#{rank}</p>
            </div>
            <div>
              <p className="label">{t('common.total-points')}:</p>
              <p className="value">{player.points}pts</p>
            </div>
          </div>
          {trials.length > 0 && (
            <div className="trials-container">
              {trials &&
                trials
                  .filter((trial) => trial.organiserId !== player.id)
                  .map((trial) => {
                    const trialRank = trial.ranking.findIndex((value) => value === player.id) + 1

                    return (
                      <div className="trial-container">
                        <p className="label">{trial.name}:</p>
                        <p className={`value ${getTextClassName(trialRank)}`}>#{trialRank}</p>
                      </div>
                    )
                  })}
            </div>
          )}
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
  width: 300px;

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
