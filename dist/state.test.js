"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const types_js_1 = require("./types.js");
const state_js_1 = require("./state.js");
(0, vitest_1.describe)('State Modifiers', () => {
    (0, vitest_1.describe)('changeBase', () => {
        (0, vitest_1.it)('should change game base and keep length if valid', () => {
            const state = { ...types_js_1.INITIAL_STATE, settings: { base: 10, length: 4 } };
            const nextState = (0, state_js_1.changeBase)(state, 16);
            (0, vitest_1.expect)(nextState.settings.base).toBe(16);
            (0, vitest_1.expect)(nextState.settings.length).toBe(4);
            (0, vitest_1.expect)(state.settings.base).toBe(10);
        });
        (0, vitest_1.it)('should force length to 2 if base 2 is selected', () => {
            const state = { ...types_js_1.INITIAL_STATE, settings: { base: 10, length: 4 } };
            const nextState = (0, state_js_1.changeBase)(state, 2);
            (0, vitest_1.expect)(nextState.settings.base).toBe(2);
            (0, vitest_1.expect)(nextState.settings.length).toBe(2);
        });
    });
    (0, vitest_1.describe)('changeLength', () => {
        (0, vitest_1.it)('should update code length', () => {
            const state = { ...types_js_1.INITIAL_STATE, settings: { base: 10, length: 4 } };
            const nextState = (0, state_js_1.changeLength)(state, 5);
            (0, vitest_1.expect)(nextState.settings.length).toBe(5);
            (0, vitest_1.expect)(state.settings.length).toBe(4);
        });
    });
    (0, vitest_1.describe)('startGame', () => {
        (0, vitest_1.it)('should transition to GAME screen, generate secret and set start time', () => {
            const state = { ...types_js_1.INITIAL_STATE, settings: { base: 10, length: 4 } };
            let mockValue = 0.1;
            const mockRandom = () => {
                mockValue += 0.15;
                return mockValue;
            };
            const nextState = (0, state_js_1.startGame)(state, mockRandom);
            (0, vitest_1.expect)(nextState.screen).toBe('GAME');
            (0, vitest_1.expect)(nextState.secret).not.toBe('');
            (0, vitest_1.expect)(nextState.secret.length).toBe(4);
            (0, vitest_1.expect)(nextState.history).toEqual([]);
            (0, vitest_1.expect)(nextState.startTime).not.toBeNull();
        });
    });
    (0, vitest_1.describe)('makeGuess', () => {
        (0, vitest_1.it)('should add guess entry to history and remain on GAME screen if not fully guessed', () => {
            const state = {
                ...types_js_1.INITIAL_STATE,
                screen: 'GAME',
                secret: '1234',
                settings: { base: 10, length: 4 },
                startTime: Date.now(),
            };
            const nextState = (0, state_js_1.makeGuess)(state, '1243'); // 2 bulls (1, 2), 2 cows (4, 3)
            (0, vitest_1.expect)(nextState.screen).toBe('GAME');
            (0, vitest_1.expect)(nextState.history).toHaveLength(1);
            (0, vitest_1.expect)(nextState.history[0]).toEqual({
                guess: '1243',
                bulls: 2,
                cows: 2,
            });
        });
        (0, vitest_1.it)('should transition to WIN screen and calculate duration when all bulls found', () => {
            const startTime = Date.now() - 5000; // 5 seconds ago
            const state = {
                ...types_js_1.INITIAL_STATE,
                screen: 'GAME',
                secret: '1234',
                settings: { base: 10, length: 4 },
                startTime,
            };
            const nextState = (0, state_js_1.makeGuess)(state, '1234'); // 4 bulls
            (0, vitest_1.expect)(nextState.screen).toBe('WIN');
            (0, vitest_1.expect)(nextState.duration).toBeGreaterThanOrEqual(5);
        });
    });
    (0, vitest_1.describe)('goToMenu', () => {
        (0, vitest_1.it)('should reset state to initial but keep active user settings', () => {
            const state = {
                screen: 'WIN',
                settings: { base: 16, length: 5 },
                secret: 'ABCDE',
                history: [{ guess: 'ABCDE', bulls: 5, cows: 0 }],
                startTime: 123456,
                duration: 42,
            };
            const nextState = (0, state_js_1.goToMenu)(state);
            (0, vitest_1.expect)(nextState.screen).toBe('MENU');
            (0, vitest_1.expect)(nextState.settings.base).toBe(16);
            (0, vitest_1.expect)(nextState.settings.length).toBe(5);
            (0, vitest_1.expect)(nextState.secret).toBe('');
            (0, vitest_1.expect)(nextState.history).toEqual([]);
            (0, vitest_1.expect)(nextState.startTime).toBeNull();
            (0, vitest_1.expect)(nextState.duration).toBe(0);
        });
    });
});
