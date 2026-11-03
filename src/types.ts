export type GameBase = 2 | 8 | 10 | 16;
export type GameScreen = 'MENU' | 'GAME' | 'WIN';

export interface GuessEntry {
  readonly guess: string;
  readonly bulls: number;
  readonly cows: number;
}

export interface ScoreRecord {
  readonly name: string;
  readonly base: GameBase;
  readonly length: number;
  readonly attempts: number;
  readonly timeSeconds: number;
  readonly date: string;
}

export interface GameState {
  readonly screen: GameScreen;
  readonly settings: {
    readonly base: GameBase;
    readonly length: number;
  };
  readonly secret: string;
  readonly history: readonly GuessEntry[];
  readonly startTime: number | null;
  readonly duration: number;
}
export const INITIAL_STATE: GameState = {
  screen: 'MENU',
  settings: {
    base: 10,
    length: 4,
  },
  secret: '',
  history: [],
  startTime: null,
  duration: 0,
};
