import { describe, it, expect } from 'vitest';
import { INITIAL_STATE } from './types.js';
import { changeBase, changeLength, startGame, makeGuess, goToMenu } from './state.js';

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

  describe('makeGuess', () => {
    it('should add guess entry to history and remain on GAME screen if not fully guessed', () => {
      const state = {
        ...INITIAL_STATE,
        screen: 'GAME' as const,
        secret: '1234',
        settings: { base: 10 as const, length: 4 },
        startTime: Date.now(),
      };

      const nextState = makeGuess(state, '1243'); // 2 bulls (1, 2), 2 cows (4, 3)

      expect(nextState.screen).toBe('GAME');
      expect(nextState.history).toHaveLength(1);
      expect(nextState.history[0]).toEqual({
        guess: '1243',
        bulls: 2,
        cows: 2,
      });
    });

    it('should transition to WIN screen and calculate duration when all bulls found', () => {
      const startTime = Date.now() - 5000; // 5 seconds ago
      const state = {
        ...INITIAL_STATE,
        screen: 'GAME' as const,
        secret: '1234',
        settings: { base: 10 as const, length: 4 },
        startTime,
      };

      const nextState = makeGuess(state, '1234'); // 4 bulls

      expect(nextState.screen).toBe('WIN');
      expect(nextState.duration).toBeGreaterThanOrEqual(5);
    });
  });
  describe('goToMenu', () => {
    it('should reset state to initial but keep active user settings', () => {
      const state = {
        screen: 'WIN' as const,
        settings: { base: 16 as const, length: 5 },
        secret: 'ABCDE',
        history: [{ guess: 'ABCDE', bulls: 5, cows: 0 }],
        startTime: 123456,
        duration: 42,
      };

      const nextState = goToMenu(state);

      expect(nextState.screen).toBe('MENU');
      expect(nextState.settings.base).toBe(16);
      expect(nextState.settings.length).toBe(5);
      expect(nextState.secret).toBe('');
      expect(nextState.history).toEqual([]);
      expect(nextState.startTime).toBeNull();
      expect(nextState.duration).toBe(0);
    });
  });
});
