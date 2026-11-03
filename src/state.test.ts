import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from './types';
import { changeBase, changeLength } from './state';

describe('State Modifiers', () => {
  describe('changeBase', () => {
    it('should change game base and keep length if valid', () => {
      const state = { ...INITIAL_STATE, settings: { base: 10 as const, length: 4 } };
      const nextState = changeBase(state, 16);
      expect(nextState.settings.base).toBe(16);
      expect(nextState.settings.length).toBe(4);
      expect(state.settings.base).toBe(10); // Check immutability
    });

    it('should force length to 2 if base 2 is selected', () => {
      const state = { ...INITIAL_STATE, settings: { base: 10 as const, length: 4 } };
      const nextState = changeBase(state, 2);
      expect(nextState.settings.base).toBe(2);
      expect(nextState.settings.length).toBe(2);
    });
  });

  describe('changeLength', () => {
    it('should update code length', () => {
      const state = { ...INITIAL_STATE, settings: { base: 10 as const, length: 4 } };
      const nextState = changeLength(state, 5);
      expect(nextState.settings.length).toBe(5);
      expect(state.settings.length).toBe(4); // Check immutability
    });
  });
});
