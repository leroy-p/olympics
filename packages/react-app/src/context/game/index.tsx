import { createContext } from 'react'

import { ITrial, useGameContext } from './hook'

export const gameContextDefaultValue: ReturnType<typeof useGameContext> = {
  players: undefined,
  trials: undefined,
  loading: true,
  addTrial: (_trial: ITrial) => Promise.resolve(),
}

export const GameContext = createContext<ReturnType<typeof useGameContext>>(gameContextDefaultValue)
