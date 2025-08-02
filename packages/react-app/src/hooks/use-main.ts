import { useEffect, useState } from 'react'

const WORKER_URL = 'https://hasta-la-vista-worker.skkel.com/data'

export interface IPlayer {
  name: string
  pic: string
  points: number
}

export function useMain() {
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getData() {
      const res = await fetch(WORKER_URL)
      const data = (await res.json()) as IPlayer[]

      setPlayers(data)

      setLoading(false)
    }

    getData()
  }, [])

  return {
    players,
    loading,
  }
}
