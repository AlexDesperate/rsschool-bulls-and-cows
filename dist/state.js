"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBase = changeBase;
exports.changeLength = changeLength;
exports.startGame = startGame;
exports.makeGuess = makeGuess;
exports.goToMenu = goToMenu;
const types_1 = require("./types");
const core_1 = require("./core");
function changeBase(state, base) {
    const targetLength = base === 2 ? 2 : state.settings.length;
    return {
        ...state,
        settings: {
            base,
            length: targetLength,
        },
    };
}
function changeLength(state, length) {
    return {
        ...state,
        settings: {
            ...state.settings,
            length,
        },
    };
}
function startGame(state, random = Math.random) {
    return {
        ...state,
        screen: 'GAME',
        secret: (0, core_1.generateSecret)(state.settings.length, state.settings.base, random),
        history: [],
        startTime: Date.now(),
        duration: 0,
    };
}
function makeGuess(state, guess) {
    const { bulls, cows } = (0, core_1.evaluateGuess)(state.secret, guess);
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
function goToMenu(state) {
    return {
        ...types_1.INITIAL_STATE,
        settings: state.settings,
    };
}
