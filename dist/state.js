import { INITIAL_STATE } from './types.js';
import { generateSecret, evaluateGuess } from './core.js';
export function changeBase(state, base) {
    const targetLength = base === 2 ? 2 : state.settings.length;
    return {
        ...state,
        settings: {
            base,
            length: targetLength,
        },
    };
}
export function changeLength(state, length) {
    return {
        ...state,
        settings: {
            ...state.settings,
            length,
        },
    };
}
export function startGame(state, random = Math.random) {
    return {
        ...state,
        screen: 'GAME',
        secret: generateSecret(state.settings.length, state.settings.base, random),
        history: [],
        startTime: Date.now(),
        duration: 0,
    };
}
export function makeGuess(state, guess) {
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
export function goToMenu(state) {
    return {
        ...INITIAL_STATE,
        settings: state.settings,
    };
}
