import { getScores, saveScore } from './score.js';
import { createDigitValidator, isValidGuess } from './core.js';
export function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);
    if (options.className) {
        element.className = options.className;
    }
    if (options.text !== undefined) {
        element.textContent = options.text;
    }
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    if (options.children) {
        options.children.forEach((child) => {
            element.appendChild(child);
        });
    }
    return element;
}
export function renderMenu(state, onBaseChange, onLengthChange, onStart) {
    const bases = [2, 8, 10, 16];
    const baseOptions = bases.map((b) => {
        const opt = createElement('option', { text: b.toString(), className: 'ui-option' });
        opt.value = b.toString();
        opt.selected = state.settings.base === b;
        return opt;
    });
    const baseSelect = createElement('select', { className: 'select-base' });
    baseOptions.forEach((opt) => baseSelect.appendChild(opt));
    baseSelect.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        onBaseChange(val);
    });
    const lengthSelect = createElement('select', { className: 'select-length' });
    for (let i = 2; i <= 6; i++) {
        const opt = createElement('option', { text: i.toString(), className: 'ui-option' });
        opt.value = i.toString();
        opt.selected = state.settings.length === i;
        lengthSelect.appendChild(opt);
    }
    if (state.settings.base === 2) {
        lengthSelect.disabled = true;
    }
    lengthSelect.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        onLengthChange(val);
    });
    const startBtn = createElement('button', {
        className: 'btn-start',
        text: 'Start Game',
    });
    if (state.settings.length > state.settings.base) {
        startBtn.disabled = true;
    }
    startBtn.addEventListener('click', onStart);
    const menuContainer = createElement('div', {
        className: 'menu-container',
        children: [
            createElement('h1', { className: 'game-title', text: 'Bulls and Cows' }),
            createElement('div', {
                className: 'setting-row',
                children: [createElement('label', { text: 'Select Base: ' }), baseSelect],
            }),
            createElement('div', {
                className: 'setting-row',
                children: [createElement('label', { text: 'Word Length: ' }), lengthSelect],
            }),
            startBtn,
        ],
    });
    return menuContainer;
}
export function renderGame(state, onGuess, onCancel) {
    const infoText = `Playing with Base ${state.settings.base}, Length ${state.settings.length}`;
    const header = createElement('div', { className: 'game-info', text: infoText });
    const input = createElement('input', {
        className: 'input-guess',
        attrs: {
            type: 'text',
            maxlength: state.settings.length.toString(),
            placeholder: `Enter ${state.settings.length} unique digits`,
        },
    });
    const isValidDigit = createDigitValidator(state.settings.base);
    input.addEventListener('input', (e) => {
        const target = e.target;
        target.value = [...target.value]
            .map((char) => char.toLowerCase())
            .filter((char) => isValidDigit(char))
            .join('');
    });
    const submitBtn = createElement('button', {
        className: 'btn-submit',
        text: 'Guess',
    });
    submitBtn.addEventListener('click', () => {
        const guessValue = input.value.trim();
        if (isValidGuess(guessValue, state.settings.length, state.settings.base)) {
            onGuess(guessValue);
            input.value = '';
        }
    });
    const cancelBtn = createElement('button', {
        className: 'btn-cancel',
        text: 'Back to Menu',
    });
    cancelBtn.addEventListener('click', onCancel);
    const tableRows = state.history.map((entry, index) => {
        return createElement('tr', {
            className: 'table-row',
            children: [
                createElement('td', { text: (index + 1).toString(), className: 'cell-index' }),
                createElement('td', { text: entry.guess, className: 'cell-guess' }),
                createElement('td', { text: entry.bulls.toString(), className: 'cell-bulls' }),
                createElement('td', { text: entry.cows.toString(), className: 'cell-cows' }),
            ],
        });
    });
    const tableHeader = createElement('tr', {
        className: 'table-header',
        children: [
            createElement('th', { text: '#' }),
            createElement('th', { text: 'Guess' }),
            createElement('th', { text: 'Bulls' }),
            createElement('th', { text: 'Cows' }),
        ],
    });
    const historyTable = createElement('table', {
        className: 'history-table',
        children: [tableHeader, ...tableRows],
    });
    const gameContainer = createElement('div', {
        className: 'game-container',
        children: [header, input, submitBtn, cancelBtn, historyTable],
    });
    return gameContainer;
}
export function renderWin(state, onRestart) {
    const winMessage = createElement('h1', { className: 'win-title', text: 'You Won!' });
    const baseText = `System Base: ${state.settings.base}`;
    const lengthText = `Word Length: ${state.settings.length}`;
    const attemptsText = `Total Attempts: ${state.history.length}`;
    const timeText = `Time Taken: ${state.duration} seconds`;
    const container = createElement('div', { className: 'win-container' });
    const nameInput = createElement('input', {
        className: 'input-name',
        attrs: { type: 'text', placeholder: 'Enter your name' },
    });
    const saveBtn = createElement('button', { className: 'btn-save', text: 'Save Record' });
    const scoreContainer = createElement('div', { className: 'score-container' });
    const renderScoresTable = () => {
        scoreContainer.textContent = '';
        const scores = getScores();
        const tableHeader = createElement('tr', {
            className: 'score-header',
            children: [
                createElement('th', { text: '#' }),
                createElement('th', { text: 'Name' }),
                createElement('th', { text: 'Base' }),
                createElement('th', { text: 'Length' }),
                createElement('th', { text: 'Attempts' }),
                createElement('th', { text: 'Time' }),
            ],
        });
        const rows = scores.map((rec, index) => {
            return createElement('tr', {
                className: 'score-row',
                children: [
                    createElement('td', { text: (index + 1).toString() }),
                    createElement('td', { text: rec.name }),
                    createElement('td', { text: rec.base.toString() }),
                    createElement('td', { text: rec.length.toString() }),
                    createElement('td', { text: rec.attempts.toString() }),
                    createElement('td', { text: `${rec.timeSeconds}s` }),
                ],
            });
        });
        const table = createElement('table', {
            className: 'score-table',
            children: [tableHeader, ...rows],
        });
        scoreContainer.appendChild(table);
    };
    saveBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            saveScore(name, state.settings.base, state.settings.length, state.history.length, state.duration);
            nameInput.disabled = true;
            saveBtn.disabled = true;
            renderScoresTable();
        }
    });
    renderScoresTable();
    const restartBtn = createElement('button', {
        className: 'btn-restart',
        text: 'Play Again',
    });
    restartBtn.addEventListener('click', onRestart);
    container.appendChild(winMessage);
    container.appendChild(createElement('p', { text: baseText }));
    container.appendChild(createElement('p', { text: lengthText }));
    container.appendChild(createElement('p', { text: attemptsText }));
    container.appendChild(createElement('p', { text: timeText }));
    container.appendChild(nameInput);
    container.appendChild(saveBtn);
    container.appendChild(scoreContainer);
    container.appendChild(restartBtn);
    return container;
}
