"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_js_1 = require("./types.js");
const state_js_1 = require("./state.js");
const ui_js_1 = require("./ui.js");
let state = types_js_1.INITIAL_STATE;
function updateState(nextState) {
    state = nextState;
    render();
}
function render() {
    const root = document.body;
    root.textContent = '';
    if (state.screen === 'MENU') {
        const menuElement = (0, ui_js_1.renderMenu)(state, (base) => updateState((0, state_js_1.changeBase)(state, base)), (length) => updateState((0, state_js_1.changeLength)(state, length)), () => updateState((0, state_js_1.startGame)(state)));
        root.appendChild(menuElement);
    }
    else if (state.screen === 'GAME') {
        const gameElement = (0, ui_js_1.renderGame)(state, (guess) => updateState((0, state_js_1.makeGuess)(state, guess)), () => updateState((0, state_js_1.goToMenu)(state)));
        root.appendChild(gameElement);
    }
    else if (state.screen === 'WIN') {
        const winElement = (0, ui_js_1.renderWin)(state, () => updateState((0, state_js_1.goToMenu)(state)));
        root.appendChild(winElement);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    render();
});
