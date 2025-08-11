import { dom } from '@utils';

const createBoardMenuMobile = () => {
  const rootElem = dom.create({ tag: 'div', className: 'board-header__menu-mobile' });
  const btn = dom.create({
    tag: 'button',
    className: 'burger-btn',
    attrs: {type: 'button', 'aria-expanded': 'false'}
  });
  btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>';

  const menu = dom.create({
    tag: 'div',
    className: 'burger-menu',
    attrs: { hidden: ''}
  });
  menu.hidden = true;
  const list = dom.create({
    tag: 'ul',
    className: 'burger-list'
  });
  [
    { id: 'clear-all', label: 'Clear all'},
    { id: 'clear-done', label: 'Clear done'},
  ].forEach(({ id, label }) => {
    const li = dom.create({ tag: 'li'});
    const itemBtn = dom.create({
      tag: 'button',
      className: 'burger-action',
      textContent: label,
      dataset: {action: id}
    });
    li.appendChild(itemBtn);
    list.appendChild(li);
  });
  menu.appendChild(list);
  rootElem.append(btn, menu);

  const openMenu = () => {
    if (!menu.hidden) return;
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    const onDoc = (e) => { if (!rootElem.contains(e.target)) closeMenu(); };
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    rootElem._closers = { onDoc, onKey };
    setTimeout(() => {
      document.addEventListener('click', onDoc, true);
      document.addEventListener('keydown', onKey, true);
    }, 0);
  };
  const closeMenu = () => {
    if (menu.hidden) return;
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (rootElem._closers) {
      document.removeEventListener('click', rootElem._closers.onDoc, true);
      document.removeEventListener('keydown', rootElem._closers.onKey, true);
      rootElem._closers = null;
    }
  };
  const toggleMenu = () => (menu.hasAttribute('hidden') ? openMenu() : closeMenu());
  btn.addEventListener('click', (e) => {
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
