"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const core_js_1 = require("./core.js");
(0, vitest_1.describe)('createDigitValidator', () => {
    (0, vitest_1.it)('should validate binary numbers correctly', () => {
        const isBinary = (0, core_js_1.createDigitValidator)(2);
        (0, vitest_1.expect)(isBinary('0')).toBe(true);
        (0, vitest_1.expect)(isBinary('1')).toBe(true);
        (0, vitest_1.expect)(isBinary('2')).toBe(false);
    });
    (0, vitest_1.it)('should validate decimal numbers correctly', () => {
        const isDecimal = (0, core_js_1.createDigitValidator)(10);
        (0, vitest_1.expect)(isDecimal('5')).toBe(true);
        (0, vitest_1.expect)(isDecimal('a')).toBe(false);
    });
    (0, vitest_1.it)('should validate hex numbers case-insensitively', () => {
        const isHex = (0, core_js_1.createDigitValidator)(16);
        (0, vitest_1.expect)(isHex('a')).toBe(true);
        (0, vitest_1.expect)(isHex('F')).toBe(true);
        (0, vitest_1.expect)(isHex('g')).toBe(false);
    });
});
(0, vitest_1.describe)('isValidGuess', () => {
    (0, vitest_1.it)('should return true for a valid decimal guess', () => {
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('1234', 4, 10)).toBe(true);
    });
    (0, vitest_1.it)('should return false if length is incorrect', () => {
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('123', 4, 10)).toBe(false);
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('12345', 4, 10)).toBe(false);
    });
    (0, vitest_1.it)('should return false if characters are repeated', () => {
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('1123', 4, 10)).toBe(false);
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('aAbB', 4, 16)).toBe(false);
    });
    (0, vitest_1.it)('should return false if characters are out of base range', () => {
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('123a', 4, 10)).toBe(false);
        (0, vitest_1.expect)((0, core_js_1.isValidGuess)('1232', 4, 2)).toBe(false);
    });
});
(0, vitest_1.describe)('generateSecret', () => {
    (0, vitest_1.it)('should generate a secret string of correct length and base', () => {
        const mockValues = [0.1, 0.2, 0.0, 0.3];
        const mockRandom = () => mockValues.shift() ?? 0;
        const secret = (0, core_js_1.generateSecret)(4, 10, mockRandom);
        (0, vitest_1.expect)(secret).toHaveLength(4);
        (0, vitest_1.expect)(new Set(secret).size).toBe(4);
    });
});
(0, vitest_1.describe)('evaluateGuess', () => {
    (0, vitest_1.it)('should correctly score guesses', () => {
        (0, vitest_1.expect)((0, core_js_1.evaluateGuess)('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
        (0, vitest_1.expect)((0, core_js_1.evaluateGuess)('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
        (0, vitest_1.expect)((0, core_js_1.evaluateGuess)('1234', '1490')).toEqual({ bulls: 1, cows: 1 });
    });
    (0, vitest_1.it)('should be case-insensitive', () => {
        (0, vitest_1.expect)((0, core_js_1.evaluateGuess)('aBcd', 'AbCD')).toEqual({ bulls: 4, cows: 0 });
    });
});
(0, vitest_1.describe)('countPossibleSecrets', () => {
    (0, vitest_1.it)('should correctly calculate combinations', () => {
        (0, vitest_1.expect)((0, core_js_1.countPossibleSecrets)(4, 10)).toBe(5040);
        (0, vitest_1.expect)((0, core_js_1.countPossibleSecrets)(2, 2)).toBe(2);
        (0, vitest_1.expect)((0, core_js_1.countPossibleSecrets)(0, 10)).toBe(1);
    });
});
