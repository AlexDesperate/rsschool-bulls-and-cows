import { GameState, INITIAL_STATE, GameBase } from './types';
import { changeBase, changeLength, startGame, makeGuess, goToMenu } from './state';
import { renderMenu, renderGame } from './ui';

let state: GameState = INITIAL_STATE;

function updateState(nextState: GameState): void {
  state = nextState;
  render();
}

function render(): void {
  const root = document.body;
  root.textContent = '';

  if (state.screen === 'MENU') {
    const menuElement = renderMenu(
      state,
      (base: GameBase) => updateState(changeBase(state, base)),
      (length: number) => updateState(changeLength(state, length)),
      () => updateState(startGame(state)),
    );
    root.appendChild(menuElement);
  } else if (state.screen === 'GAME') {
    const gameElement = renderGame(
      state,
      (guess: string) => updateState(makeGuess(state, guess)),
      () => updateState(goToMenu(state)),
    );
    root.appendChild(gameElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
});
