import { GameState, GameBase } from './types';

interface ElementOptions {
  className?: string;
  text?: string;
  attrs?: Record<string, string>;
  children?: readonly HTMLElement[];
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: ElementOptions = {},
): HTMLElementTagNameMap[K] {
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
export function renderMenu(
  state: GameState,
  onBaseChange: (base: GameBase) => void,
  onLengthChange: (length: number) => void,
  onStart: () => void,
): HTMLElement {
  const bases: GameBase[] = [2, 8, 10, 16];
  const baseOptions = bases.map((b) => {
    const opt = createElement('option', { text: b.toString(), className: 'ui-option' });
    opt.value = b.toString();
    opt.selected = state.settings.base === b;
    return opt;
  });

  const baseSelect = createElement('select', { className: 'select-base' });
  baseOptions.forEach((opt) => baseSelect.appendChild(opt));
  baseSelect.addEventListener('change', (e) => {
    const val = parseInt((e.target as HTMLSelectElement).value, 10) as GameBase;
    onBaseChange(val);
  });

  const lengthSelect = createElement('select', { className: 'select-length' });
  for (let i = 2; i <= 10; i++) {
    const opt = createElement('option', { text: i.toString(), className: 'ui-option' });
    opt.value = i.toString();
    opt.selected = state.settings.length === i;
    lengthSelect.appendChild(opt);
  }

  if (state.settings.base === 2) {
    lengthSelect.disabled = true;
  }

  lengthSelect.addEventListener('change', (e) => {
    const val = parseInt((e.target as HTMLSelectElement).value, 10);
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
