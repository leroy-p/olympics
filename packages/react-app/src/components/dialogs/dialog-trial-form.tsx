import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IPlayer, ITrial } from '../../context/game/hook'
import { useI18n } from '../../hooks/use-i18n'
import { getTextClassName } from '../../utils/utils'
import Button from '../ui/button'
import Dropdown from '../ui/dropdown'
import InputText from '../ui/input-text'
import DialogHeader from './dialog-header'
import DialogLayout from './dialog-layout'

interface IProps {
  visible?: boolean
  players: IPlayer[]
  trial?: ITrial
  close: () => void
  submit: (trial: ITrial) => Promise<void>
}

export default function DialogTrialForm({ visible, players, trial, close, submit }: IProps) {
  const { t } = useI18n()
  const [name, setName] = useState<string>('')
  const [organiserId, setOrganiserId] = useState<number>(0)
  const [ranking, setRanking] = useState<number[]>(trial?.ranking || new Array(players.length - 1).fill(0))

  useEffect(() => {
    if (!trial) return

    setName(trial.name)
    setOrganiserId(trial.organiserId)
    setRanking(trial.ranking)
  }, [trial])

  useEffect(() => {
    setRanking(!trial ? new Array(players.length - 1).fill(0) : ranking)
  }, [organiserId])

  function onClose() {
    setName(trial?.name || '')
    setOrganiserId(trial?.organiserId || 0)
    setRanking(trial?.ranking || new Array(players.length - 1).fill(0))
    close()
  }

  function canSubmit(): boolean {
    return Boolean(name.length > 0 && organiserId && !ranking.some((value) => !value))
  }

  async function onSubmit() {
    if (!canSubmit()) return

    await submit({ organiserId, ranking, name })

    setName('')
    setOrganiserId(0)
    setRanking(new Array(players.length - 1).fill(0))
    close()
  }

  function setRankingValue(index: number, value: number) {
    if (index < 0 || index > ranking.length - 1) return

    const copy = [...ranking]

    copy[index] = value

    setRanking(copy)
  }

  const options = players.map((player) => ({ label: player.name, value: player.id }))

  return (
    <DialogLayout close={onClose} visible={visible}>
      <Container>
        <DialogHeader title={trial ? t('dialog.update-trial.title') : t('dialog.add-trial.title')} />
        <div className="dialog-main-container">
          <InputText highlighted value={name} placeholder={t('dialog.enter-trial-name')} onChange={setName} />
          <Dropdown
            disabled={Boolean(trial)}
            highlighted
            onChange={setOrganiserId}
            options={options}
            placeholder={t('common.organiser')}
            value={organiserId}
          />
          {ranking.map((value, index) => (
            <Dropdown
              removeEnabled
              className={getTextClassName(index + 1)}
              key={index}
              hidden={!organiserId || !name.length}
              onChange={(value: number) => setRankingValue(index, value)}
              options={
                !value
                  ? options.filter((option) => option.value !== organiserId && !ranking.includes(option.value))
                  : options
              }
              placeholder={`#${index + 1}`}
              value={value}
            />
          ))}
          <Button disabled={!canSubmit()} onClick={onSubmit}>
            Submit
          </Button>
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
  width: 300px;

  .dialog-main-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    padding: 24px;
    width: 100%;
  }
`
