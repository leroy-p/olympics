import { useContext, useState } from 'react'
import styled from 'styled-components'
import DialogPlayer from '../components/dialogs/dialog-player'
import DialogTrialForm from '../components/dialogs/dialog-trial-form'
import Loader from '../components/loader'
import RankingTable from '../components/ranking-table'
import Button from '../components/ui/button'
import { GameContext } from '../context/game'
import { IPlayer } from '../context/game/hook'
import { useI18n } from '../hooks/use-i18n'
import Layout from '../layout'

export default function Leaderboard() {
  const { t } = useI18n()
  const { loading, players, trials, addTrial } = useContext(GameContext)
  const [showTrialFormDialog, setShowTrialFormDialog] = useState<boolean>(false)
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | undefined>(undefined)

  return (
    <Layout>
      {players && trials && (
        <Container>
          <p className="page-title">{t('leaderboard.page-title')}</p>
          <RankingTable
            rows={players.map((player) => ({
              pic: player.pic,
              name: player.name,
              points: player.points,
              p1Count: trials.filter((trial) => trial.ranking[0] === player.id).length,
              select: () => setSelectedPlayer(player),
            }))}
            title={t('leaderboard.table.title')}
            withP1Count
          />
          <Button onClick={() => setShowTrialFormDialog(true)}>{t('leaderboard.new-trial')}</Button>
          <DialogPlayer
            close={() => setSelectedPlayer(undefined)}
            player={selectedPlayer}
            trials={trials}
            visible={Boolean(selectedPlayer)}
            rank={players.findIndex((player) => player.id === selectedPlayer?.id) + 1}
          />
          {players && (
            <DialogTrialForm
              players={players}
              close={() => setShowTrialFormDialog(false)}
              submit={addTrial}
              visible={showTrialFormDialog}
            />
          )}
          {loading && <Loader />}
        </Container>
      )}
    </Layout>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding-bottom: 24px;
  width: 100%;

  .page-title {
    font-size: 16px;
    opacity: 0.6;
  }
`
