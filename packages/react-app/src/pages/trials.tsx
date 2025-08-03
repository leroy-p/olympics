import { useContext, useState } from 'react'
import styled from 'styled-components'
import DialogTrial from '../components/dialogs/dialog-trial'
import DialogTrialForm from '../components/dialogs/dialog-trial-form'
import Loader from '../components/loader'
import TrialContainer from '../components/trial-container'
import { GameContext } from '../context/game'
import { ITrial } from '../context/game/hook'
import { useI18n } from '../hooks/use-i18n'
import Layout from '../layout'

export default function Trials() {
  const { t } = useI18n()
  const { loading, players, trials, addTrial } = useContext(GameContext)
  const [selectedTrial, setSelectedTrial] = useState<ITrial | undefined>(undefined)
  const [trialToUpdate, setTrialToUpdate] = useState<ITrial | undefined>(undefined)

  return (
    <Layout>
      <Container>
        <p className="page-title">{t('trials.page-title')}</p>
        {trials?.length ? (
          <div className="trials-container">
            {trials.map((trial, index) => (
              <TrialContainer
                edit={() => setTrialToUpdate(trial)}
                key={index}
                open={() => setSelectedTrial(trial)}
                trial={trial}
              />
            ))}
          </div>
        ) : (
          <p className="no-trial">{t('trials.no-result')}</p>
        )}
        <DialogTrial close={() => setSelectedTrial(undefined)} trial={selectedTrial} visible={Boolean(selectedTrial)} />
        {players && (
          <DialogTrialForm
            players={players}
            close={() => setTrialToUpdate(undefined)}
            submit={addTrial}
            trial={trialToUpdate}
            visible={Boolean(trialToUpdate)}
          />
        )}
        {loading && <Loader />}
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  justify-content: flex-start;
  padding-bottom: 24px;
  width: 100%;

  .page-title {
    font-size: 16px;
    opacity: 0.6;
  }

  .trials-container {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(158px, max-content));
    justify-content: center;
    justify-items: start;
    width: 100%;
  }
`
