import { createElement } from '../utils/dom.js';

export const Board = () => {
  const header = createElement({
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
  const columns = createElement({
    tag: 'div',
    className: 'board-wrapper',
    children: [
      createElement({
        tag: 'div',
        className: 'board-columns',
        children: Array.from({ length: 5 }, (_, i) =>
          createElement({
            tag: 'div',
            className: 'list',
            children: [
              createElement({
                tag: 'h2',
                className: 'list_title',
                textContent: `Column ${i + 1}`,
              }),
            ],
          })
        ),
      }),
    ],
  });

  return [header, columns]; 
};