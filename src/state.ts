import { GameState, GameBase } from './types';

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
