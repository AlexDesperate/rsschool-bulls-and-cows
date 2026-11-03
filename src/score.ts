import { ScoreRecord, GameBase } from './types';

const STORAGE_KEY = 'bulls_and_cows_scores';

export function getScores(): readonly ScoreRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data) as readonly ScoreRecord[];
  } catch {
    return [];
  }
}

export function saveScore(
  name: string,
  base: GameBase,
  length: number,
  attempts: number,
  timeSeconds: number,
): readonly ScoreRecord[] {
  const currentScores = getScores();

  const newRecord: ScoreRecord = {
    name,
    base,
    length,
    attempts,
    timeSeconds,
    date: new Date().toISOString(),
  };

  const updatedScores = [...currentScores, newRecord];

  const sortedScores = [...updatedScores].sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }
    return a.timeSeconds - b.timeSeconds;
  });

  const topTen = sortedScores.slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(topTen));
  return topTen;
}
