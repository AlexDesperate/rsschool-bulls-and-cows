"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const score_1 = require("./score");
(0, vitest_1.describe)('Score System', () => {
    (0, vitest_1.beforeEach)(() => {
        let store = {};
        globalThis.localStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => {
                store[key] = value;
            },
            clear: () => {
                store = {};
            },
            removeItem: (key) => {
                delete store[key];
            },
            length: 0,
            key: () => null,
        };
    });
    (0, vitest_1.it)('should return empty array if no scores exist', () => {
        (0, vitest_1.expect)((0, score_1.getScores)()).toEqual([]);
    });
    (0, vitest_1.it)('should sort scores by attempts first, then by time', () => {
        (0, score_1.saveScore)('Player B', 10, 4, 5, 30);
        (0, score_1.saveScore)('Player A', 10, 4, 3, 45);
        (0, score_1.saveScore)('Player C', 10, 4, 3, 20);
        const scores = (0, score_1.getScores)();
        (0, vitest_1.expect)(scores[0].name).toBe('Player C');
        (0, vitest_1.expect)(scores[1].name).toBe('Player A');
        (0, vitest_1.expect)(scores[2].name).toBe('Player B');
    });
    (0, vitest_1.it)('should limit the high scores to top 10 items', () => {
        for (let i = 1; i <= 12; i++) {
            (0, score_1.saveScore)(`Player ${i}`, 10, 4, i, 10);
        }
        const scores = (0, score_1.getScores)();
        (0, vitest_1.expect)(scores).toHaveLength(10);
        (0, vitest_1.expect)(scores[9].name).toBe('Player 10');
    });
});
