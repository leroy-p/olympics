import styled from 'styled-components'
import { useI18n } from '../hooks/use-i18n'
import { getTextClassName } from '../utils/utils'
import PicContainer from './pic-container'

export interface ITableRow {
  pic: string
  name: string
  points: number
  p1Count?: number
  select?: () => void
}

interface IProps {
  title: string
  rows: ITableRow[]
  withP1Count?: boolean
}

export default function RankingTable({ title, rows, withP1Count }: IProps) {
  const { t } = useI18n()

  return (
    <Container $withP1Count={withP1Count}>
      <div className="title-container">
        <p>{title}</p>
      </div>
      <div className="labels-container">
        <div className="player-label-container">
          <p>{t('table.label.player')}</p>
        </div>
        {withP1Count && (
          <div className="p1-count-label-container">
            <p>{t('table.label.p1-count')}</p>
          </div>
        )}
        <div className="points-label-container">
          <p>{t('table.label.points')}</p>
        </div>
      </div>
      {rows.map((row, index) => (
        <div className="row-container" key={row.name} onClick={row.select}>
          <div className="player-container">
            <p className={`position ${getTextClassName(index + 1)}`}>#{index + 1}</p>
            <PicContainer pic={row.pic} size={40} />
            <p className="name">{row.name}</p>
          </div>
          {withP1Count && row.p1Count !== undefined && (
            <div className="p1-count-container">
              <p className={getTextClassName(index + 1)}>{row.p1Count}</p>
            </div>
          )}
          <div className="points-container">
            <p className={getTextClassName(index + 1)}>{row.points}</p>
          </div>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div<{ $withP1Count?: boolean }>`
  align-items: center;
  border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #000000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;

  .title-container {
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
  }

  .labels-container {
    align-items: center;
    border-bottom: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    .player-label-container {
      align-items: center;
      border-right: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 8px 16px;
      width: ${({ $withP1Count }) => ($withP1Count ? 'calc(100% - 128px)' : 'calc(100% - 64px)')};

      & > p {
        font-size: 16px;
        text-align: left;
      }
    }

    .p1-count-label-container {
      align-items: center;
      border-right: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 8px 0;
      width: 64px;

      & > p {
        font-size: 16px;
        text-align: left;
      }
    }

    .points-label-container {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 8px 0;
      width: 64px;

      & > p {
        font-size: 16px;
        text-align: left;
      }
    }
  }

  .row-container {
    align-items: center;
    border-bottom: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
    display: flex;
    flex-direction: row;
    height: 48px;
    justify-content: center;
    width: 100%;

    .player-container {
      align-items: center;
      border-right: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
      display: flex;
      flex-direction: row;
      gap: 8px;
      height: 100%;
      justify-content: flex-start;
      padding: 0 16px;
      width: ${({ $withP1Count }) => ($withP1Count ? 'calc(100% - 128px)' : 'calc(100% - 64px)')};

      .position {
        color: ${({ theme }) => theme.palette.secondary};
        font-size: 20px;
      }

      .name {
        font-size: 16px;
      }
    }

    .p1-count-container {
      align-items: center;
      border-right: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
      display: flex;
      flex-direction: row;
      height: 100%;
      justify-content: center;
      width: 64px;

      & > p {
        color: ${({ theme }) => theme.palette.secondary};
        font-size: 18px;
        font-weight: bold;
      }
    }

    .points-container {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 100%;
      justify-content: center;
      width: 64px;

      & > p {
        color: ${({ theme }) => theme.palette.secondary};
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  & > div:nth-last-child(1) {
    border-bottom: none;
  }
`
