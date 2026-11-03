import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess, generateSecret, evaluateGuess } from './core.js';

describe('createDigitValidator', () => {
  it('should validate binary numbers correctly', () => {
    const isBinary = createDigitValidator(2);
    expect(isBinary('0')).toBe(true);
    expect(isBinary('1')).toBe(true);
    expect(isBinary('2')).toBe(false);
  });

  it('should validate decimal numbers correctly', () => {
    const isDecimal = createDigitValidator(10);
    expect(isDecimal('5')).toBe(true);
    expect(isDecimal('a')).toBe(false);
  });

  it('should validate hex numbers case-insensitively', () => {
    const isHex = createDigitValidator(16);
    expect(isHex('a')).toBe(true);
    expect(isHex('F')).toBe(true);
    expect(isHex('g')).toBe(false);
  });
});

describe('isValidGuess', () => {
  it('should return true for a valid decimal guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('should return false if length is incorrect', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('should return false if characters are repeated', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('aAbB', 4, 16)).toBe(false);
  });

  it('should return false if characters are out of base range', () => {
    expect(isValidGuess('123a', 4, 10)).toBe(false);
    expect(isValidGuess('1232', 4, 2)).toBe(false);
  });
});

describe('generateSecret', () => {
  it('should generate a secret string of correct length and base', () => {
    const mockValues = [0.1, 0.2, 0.0, 0.3];
    const mockRandom = () => mockValues.shift() ?? 0;

    const secret = generateSecret(4, 10, mockRandom);
    expect(secret).toHaveLength(4);
    expect(new Set(secret).size).toBe(4);
  });
});
describe('evaluateGuess', () => {
  it('should correctly score guesses', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    expect(evaluateGuess('1234', '1490')).toEqual({ bulls: 1, cows: 1 });
  });

  it('should be case-insensitive', () => {
    expect(evaluateGuess('aBcd', 'AbCD')).toEqual({ bulls: 4, cows: 0 });
  });
});
