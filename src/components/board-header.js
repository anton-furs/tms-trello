import { dom } from '@utils';

const createBoardMenuMobile = () => {
  const rootElem = dom.create({ tag: 'div', className: 'board-header__menu-mobile' });
  return rootElem;
};

export const createBoardHeader = ({ name }) => {
  const rootElem = dom.create({ tag: 'div', className: 'board-header' });

  // Create title
  const titleElem = dom.create({ tag: 'p', className: 'board-header__name', textContent: name });

  // Create button group
  const buttonGroupElem = dom.create({ tag: 'div', className: 'board-header__button-group' });
  const clearAllButtonElem = dom.create({
    tag: 'button',
    className: 'board-header__button',
    textContent: 'Clear all',
    dataset: {
      action: 'clear-all',
    },
  });
  const clearDoneButtonElem = dom.create({
    tag: 'button',
    className: 'board-header__button',
    textContent: 'Clear done',
    dataset: {
      action: 'clear-done',
    },
  });

  buttonGroupElem.append(clearAllButtonElem, clearDoneButtonElem);
  rootElem.append(titleElem, buttonGroupElem);

  const handleButtonClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !rootElem.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`board:${actionName}`, { bubbles: true, composed: true });
    rootElem.dispatchEvent(event);
  };

  rootElem.addEventListener('click', handleButtonClick);

  return rootElem;
};
