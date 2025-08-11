import { dom } from '@utils';
import { createIcon } from '@components';

const MENU_ITEMS = [
  { id: 'clear-all', label: 'Clear all' },
  { id: 'clear-done', label: 'Clear done' },
];

const createBoardMenuMobile = () => {
  const rootElem = dom.create({ tag: 'div', className: 'board-header__menu-mobile' });

  const burgerButtonElem = dom.create({
    tag: 'button',
    className: 'board-header__burger-button',
    attrs: { 'type': 'button', 'aria-expanded': 'false' },
    children: [
      createIcon({ name: 'menu-01', size: 28, className: 'board-header__burger-button-icon', type: 'stroke' }),
    ],
  });

  const menu = dom.create({ tag: 'div', className: 'burger-menu', attrs: { hidden: '' } });
  menu.hidden = true;
  const list = dom.create({ tag: 'ul', className: 'burger-list' });
  MENU_ITEMS.forEach(({ id, label }) => {
    const li = dom.create({ tag: 'li' });
    const itemBtn = dom.create({
      tag: 'button',
      className: 'burger-action',
      textContent: label,
      dataset: { action: id },
    });
    li.appendChild(itemBtn);
    list.appendChild(li);
  });
  menu.appendChild(list);
  rootElem.append(burgerButtonElem, menu);

  // Menu state management
  const openMenu = () => {
    if (!menu.hidden) return;
    menu.hidden = false;
    burgerButtonElem.setAttribute('aria-expanded', 'true');
    const onDoc = (e) => {
      if (!rootElem.contains(e.target)) closeMenu();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    rootElem._closers = { onDoc, onKey };
    setTimeout(() => {
      document.addEventListener('click', onDoc, true);
      document.addEventListener('keydown', onKey, true);
    }, 0);
  };

  const closeMenu = () => {
    if (menu.hidden) return;
    menu.hidden = true;
    burgerButtonElem.setAttribute('aria-expanded', 'false');
    if (rootElem._closers) {
      document.removeEventListener('click', rootElem._closers.onDoc, true);
      document.removeEventListener('keydown', rootElem._closers.onKey, true);
      rootElem._closers = null;
    }
  };

  const toggleMenu = () => (menu.hasAttribute('hidden') ? openMenu() : closeMenu());
  burgerButtonElem.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('[data-action]')) closeMenu();
  });
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

  const mobileMenuElem = createBoardMenuMobile();
  rootElem.appendChild(mobileMenuElem);

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
