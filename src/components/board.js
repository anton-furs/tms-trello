import { createElement } from '../utils/dom.js';

export const Board = () => {
  return createElement({
    tag: 'section',
    className: 'board-header',
    children: [
      createElement({
        tag: 'h1',
        className: 'board-header__title',
        textContent: 'Team Project Board',
      }),
      createElement({
        tag: 'div',
        className: 'board-header__buttons',
        children: [
          createElement({
            tag: 'button',
            className: 'board-header__button',
            textContent: 'Clear all',
          }),
          createElement({
            tag: 'button',
            className: 'board-header__button',
            textContent: 'Clear done',
          }),
        ],
      }),
    ],
  });
};
