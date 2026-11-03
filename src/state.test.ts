import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from './types';
import { changeBase, changeLength, startGame } from './state';

describe('State Modifiers', () => {
  describe('changeBase', () => {
    it('should change game base and keep length if valid', () => {
      const state = { ...INITIAL_STATE, settings: { base: 10 as const, length: 4 } };
      const nextState = changeBase(state, 16);
      expect(nextState.settings.base).toBe(16);
      expect(nextState.settings.length).toBe(4);
      expect(state.settings.base).toBe(10);
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
      expect(state.settings.length).toBe(4);
    });
  });

  describe('startGame', () => {
    it('should transition to GAME screen, generate secret and set start time', () => {
      const state = { ...INITIAL_STATE, settings: { base: 10 as const, length: 4 } };
      let mockValue = 0.1;
      const mockRandom = () => {
        mockValue += 0.15;
        return mockValue;
      };

      const nextState = startGame(state, mockRandom);

      expect(nextState.screen).toBe('GAME');
      expect(nextState.secret).not.toBe('');
      expect(nextState.secret.length).toBe(4);
      expect(nextState.history).toEqual([]);
      expect(nextState.startTime).not.toBeNull();
    });
  });
});
