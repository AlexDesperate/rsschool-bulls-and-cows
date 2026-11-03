import { generateSecret } from './core';

export function changeBase(state: GameState, base: GameBase): GameState {
  const targetLength = base === 2 ? 2 : state.settings.length;

  return {
    ...state,
    settings: {
      base,
      length: targetLength,
    },
  };
}

export function changeLength(state: GameState, length: number): GameState {
  return {
    ...state,
    settings: {
      ...state.settings,
      length,
    },
  };
}

export function startGame(state: GameState, random = Math.random): GameState {
  return {
    ...state,
    screen: 'GAME',
    secret: generateSecret(state.settings.length, state.settings.base, random),
    history: [],
    startTime: Date.now(),
    duration: 0,
  };
}

export function makeGuess(state: GameState, guess: string): GameState {
  return state;
}
