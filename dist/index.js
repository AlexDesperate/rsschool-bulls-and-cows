import { INITIAL_STATE } from './types.js';
import { changeBase, changeLength, startGame, makeGuess, goToMenu } from './state.js';
import { renderMenu, renderGame, renderWin } from './ui.js';
let state = INITIAL_STATE;
function updateState(nextState) {
    state = nextState;
    render();
}
function render() {
    const root = document.body;
    root.textContent = '';
    if (state.screen === 'MENU') {
        const menuElement = renderMenu(state, (base) => updateState(changeBase(state, base)), (length) => updateState(changeLength(state, length)), () => updateState(startGame(state)));
        root.appendChild(menuElement);
    }
    else if (state.screen === 'GAME') {
        const gameElement = renderGame(state, (guess) => updateState(makeGuess(state, guess)), () => updateState(goToMenu(state)));
        root.appendChild(gameElement);
    }
    else if (state.screen === 'WIN') {
        const winElement = renderWin(state, () => updateState(goToMenu(state)));
        root.appendChild(winElement);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    render();
});
