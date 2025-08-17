import { useEffect, useState } from 'react'

const WORKER_URL = 'https://olympics-worker.skkel.com'

export interface IPlayer {
  id: number
  name: string
  pic: string
  points: number
}

export interface ITrial {
  organiserId: number
  name: string
  ranking: number[]
}

export function useGameContext() {
  const [players, setPlayers] = useState<IPlayer[] | undefined>(undefined)
  const [trials, setTrials] = useState<ITrial[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getTrials() {
      const res = await fetch(`${WORKER_URL}/trials`)
      const data = (await res.json()) as ITrial[]

      setTrials(data)
    }

    getTrials()
  }, [])

  useEffect(() => {
    if (!trials) return

    async function getPlayers() {
      const res = await fetch(`${WORKER_URL}/players`)
      const data = (await res.json()) as IPlayer[]

      setPlayers(data.sort(sortPlayers))
      setLoading(false)
    }

    getPlayers()
  }, [trials])

  async function updatePlayers(data: IPlayer[]) {
    await fetch(`${WORKER_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async function updateTrials(data: ITrial[]) {
    await fetch(`${WORKER_URL}/trials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async function addTrial(trial: ITrial) {
    if (!players || !trials) throw new Error('Data not retrieved')
    if (trial.ranking.length !== players.length - 1) throw new Error('Ranking count not valid')

    setLoading(true)

    const playersCopy = [...players]
    const trialsCopy = [...trials]
    const existingTrialIndex = trialsCopy.findIndex((item) => item.organiserId === trial.organiserId)

    if (existingTrialIndex !== -1) {
      for (let i = 0; i < trialsCopy[existingTrialIndex].ranking.length; i++) {
        const playerId = trialsCopy[existingTrialIndex].ranking[i]
        const playerIndex = playersCopy.findIndex((item) => item.id === playerId)

        if (playerIndex === -1) throw new Error('Player not found in existing ranking')

        playersCopy[playerIndex].points -= players.length - 1 - i
      }

      trialsCopy[existingTrialIndex] = trial
    } else {
      trialsCopy.push(trial)
    }

    for (let i = 0; i < trial.ranking.length; i++) {
      const playerId = trial.ranking[i]
      const playerIndex = playersCopy.findIndex((item) => item.id === playerId)

      if (playerIndex === -1) throw new Error('Player not found in ranking')

      playersCopy[playerIndex].points += players.length - 1 - i
    }

    await Promise.all([updatePlayers(playersCopy), updateTrials(trialsCopy)])

    setPlayers(playersCopy.sort(sortPlayers))
    setTrials(trialsCopy)
    setLoading(false)
  }

  function sortPlayers(p1: IPlayer, p2: IPlayer) {
    if (!trials) return p1.name.localeCompare(p2.name)

    if (p1.points === p2.points) {
      const p1Count1 = trials.filter((trial) => trial.ranking[0] === p1.id).length
      const p1Count2 = trials.filter((trial) => trial.ranking[0] === p2.id).length

      if (p1Count1 === p1Count2) {
        return p1.name.localeCompare(p2.name)
      }

      return p1Count2 - p1Count1
    }

    return p2.points - p1.points
  }

  return {
    players,
    trials,
    loading,
    addTrial,
  }
}
