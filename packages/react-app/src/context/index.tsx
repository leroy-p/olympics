import React from 'react'
import { GameContext } from './game'
import { useGameContext } from './game/hook'

interface IProps {
  children: React.ReactNode
}

export default function ContextProvider({ children }: IProps) {
  const gameContextValue = useGameContext()

  return <GameContext.Provider value={gameContextValue}>{children}</GameContext.Provider>
}
