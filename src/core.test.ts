import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './core.js';

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