import { GameState, GameBase, INITIAL_STATE } from './types.js';
import { generateSecret, evaluateGuess } from './core.js';
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
  const { bulls, cows } = evaluateGuess(state.secret, guess);
  const newEntry = { guess, bulls, cows };
  const nextHistory = [...state.history, newEntry];

  const isWin = bulls === state.settings.length;
  const now = Date.now();
  const calculatedDuration = state.startTime ? Math.floor((now - state.startTime) / 1000) : 0;

  return {
    ...state,
    screen: isWin ? 'WIN' : state.screen,
    history: nextHistory,
    duration: isWin ? calculatedDuration : state.duration,
  };
}

export function goToMenu(state: GameState): GameState {
  return {
    ...INITIAL_STATE,
    settings: state.settings,
  };
}
