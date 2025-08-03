import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { generateRoutePath, RoutePath } from '../../app/router-config'
import leaderboardIcon from '../../assets/images/icons/icon-leaderboard.png'
import trialsIcon from '../../assets/images/icons/icon-trials.png'
import { useI18n } from '../../hooks/use-i18n'
import DialogHeader from './dialog-header'
import DialogLayout from './dialog-layout'

interface IProps {
  visible?: boolean
  close: () => void
}

export default function DialogMenu({ visible, close }: IProps) {
  const { t } = useI18n()

  return (
    <DialogLayout menu close={close} visible={visible}>
      <Container>
        <DialogHeader title={t('dialog.menu.title')} />
        <div className="dialog-main-container">
          <Link onClick={close} to={generateRoutePath(RoutePath.LEADERBOARD, {})}>
            <div className="img-container">
              <img alt="" src={leaderboardIcon} />
            </div>
            <p>{t('leaderboard.page-title')}</p>
          </Link>
          <Link onClick={close} to={generateRoutePath(RoutePath.TRIALS, {})}>
            <div className="img-container">
              <img alt="" src={trialsIcon} />
            </div>
            <p>{t('trials.page-title')}</p>
          </Link>
        </div>
      </Container>
    </DialogLayout>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 248px;

  .dialog-main-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 48px;
    justify-content: center;
    padding: 24px;
    width: 100%;

    & > a {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: center;

      .img-container {
        border: ${({ theme }) => `solid 1px ${theme.palette.primary}`};
        border-radius: 10px;
        height: 64px;
        padding: 2px;
        width: 64px;

        & > img {
          height: 100%;
          width: 100%;
        }
      }

      & > p {
        font-size: 16px;
        text-align: center;
      }
    }
  }
`
