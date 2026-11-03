import { describe, it, expect, beforeEach } from 'vitest';
import { getScores, saveScore } from './score';

describe('Score System', () => {
  beforeEach(() => {
    let store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      length: 0,
      key: () => null,
    };
  });

  it('should return empty array if no scores exist', () => {
    expect(getScores()).toEqual([]);
  });

  it('should sort scores by attempts first, then by time', () => {
    saveScore('Player B', 10, 4, 5, 30);
    saveScore('Player A', 10, 4, 3, 45);
    saveScore('Player C', 10, 4, 3, 20);

    const scores = getScores();
    expect(scores[0].name).toBe('Player C');
    expect(scores[1].name).toBe('Player A');
    expect(scores[2].name).toBe('Player B');
  });

  it('should limit the high scores to top 10 items', () => {
    for (let i = 1; i <= 12; i++) {
      saveScore(`Player ${i}`, 10, 4, i, 10);
    }

    const scores = getScores();
    expect(scores).toHaveLength(10);
    expect(scores[9].name).toBe('Player 10');
  });
});
