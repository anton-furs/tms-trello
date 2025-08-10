import { dom } from '@utils/dom';
import { reactive } from '@utils/reactive';
import { createButton, createIcon, createList, createAddListModal } from '@components';
import { boardStore, cardStore, listStore } from '@stores';

export const createBoard = ({ name }) => {
  const rootElem = dom.create({ tag: 'main', className: 'board' });

  const handleListEvents = (e) => {
    if (e.type === 'list:add-card') {
      // TODO: open modal for add card
      console.log('list:add-card');
    }
    if (e.type === 'list:menu') {
      // TODO: open dropdown for list menu
      console.log('list:menu');
    }
  };

  const handleCardEvents = (e) => {
    if (e.type === 'card:delete') {
      // TODO: delete single card
      console.log('card:delete');
    }
    if (e.type === 'card:edit') {
      // TODO: open modal for edit card
      console.log('card:edit');
    }
    if (e.type === 'card:move-left') {
      // TODO: move card to the left
      console.log('card:move-left');
    }
    if (e.type === 'card:move-right') {
      // TODO: move card to the right
      console.log('card:move-right');
    }
  };

  const handleClearAll = () => {
  const ok = window.confirm('Delete ALL cards in ALL lists?');
  if (!ok) return;

  const lists = listStore.getLists?.() || [];
  for (const list of lists) {
    // We try to call what is in cardStore
    if (typeof cardStore?.removeCardsByListId === 'function') {
      cardStore.removeCardsByListId(list.id);
    } else if (typeof cardStore?.removeCardsByListName === 'function') {
      cardStore.removeCardsByListName(list.name);
    } else if (typeof cardStore?.removeCards === 'function') {
      // in case of a universal method
      cardStore.removeCards({ listId: list.id });
    } else {
      console.warn('Нет подходящего метода в cardStore для очистки списка:', list);
    }
  }

  closeHeaderMenuIfOpen();
};

  const handleClearDone = () => {
  const lists = listStore.getLists?.() || [];
  const done = lists.find(l => String(l.name).trim().toLowerCase() === 'done');
  if (!done) {
    console.warn('Список "Done" не найден');
    return closeHeaderMenuIfOpen();
  }

  const ok = window.confirm('Delete ALL cards in "Done"?');
  if (!ok) return;

  if (typeof cardStore?.removeCardsByListId === 'function') {
    cardStore.removeCardsByListId(done.id);
  } else if (typeof cardStore?.removeCardsByListName === 'function') {
    cardStore.removeCardsByListName(done.name);
  } else if (typeof cardStore?.removeCards === 'function') {
    cardStore.removeCards({ listId: done.id });
  } else {
    console.warn('Нет подходящего метода в cardStore для очистки "Done"');
  }

  closeHeaderMenuIfOpen();
};

  const handleAddList = () => {
    console.log('board:add-list');
    // TODO: open modal for add list
    const modal = createAddListModal();
    document.body.appendChild(modal);
    modal.showModal();
    modal.addEventListener('modal:confirm', (e) => {
      const data = e.detail;
      listStore.addList({ boardId: boardStore.getBoard().id, ...data });
      console.log('modal:confirm', data);
    });
    modal.addEventListener('modal:cancel', (e) => {
      console.log('modal:cancel');
    });
  };

  // Create header
  const headerElem = dom.create({ tag: 'div', className: 'board__header' });
  const titleElem = dom.create({ tag: 'p', className: 'board__name', textContent: name });

  // Create button group
  const buttonGroupElem = dom.create({ tag: 'div', className: 'board__button-group' });
  const clearAllButtonElem = createButton({ size: 'md', className: 'board__button', textContent: 'Clear all' });
  clearAllButtonElem.addEventListener('click', handleClearAll);
  const clearDoneButtonElem = createButton({ size: 'md', className: 'board__button', textContent: 'Clear done' });
  clearDoneButtonElem.addEventListener('click', handleClearDone);

  buttonGroupElem.append(clearAllButtonElem, clearDoneButtonElem);
    // === Burger button ===
  const burgerBtn = dom.create({
    tag: 'button',
    className: 'board__burger',
    attrs: { type: 'button', 'aria-controls': 'board-actions', 'aria-expanded': 'false' },
  });
  burgerBtn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  `;

  if (!buttonGroupElem.id) buttonGroupElem.id = 'board-actions';

  const closeMenu = () => {
    buttonGroupElem.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  };

  const closeHeaderMenuIfOpen = () => {
  const group = buttonGroupElem;           
  const burger = headerElem.querySelector('.board__burger');
  if (group?.classList.contains('is-open')) {
    group.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  }
};

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const opened = buttonGroupElem.classList.toggle('is-open');
    burgerBtn.setAttribute('aria-expanded', String(opened));
  });

  // click outside - close
  document.addEventListener('click', (e) => {
    if (!buttonGroupElem.contains(e.target) && !burgerBtn.contains(e.target)) closeMenu();
  });
  // Esc — close
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  // returned to desktop - close
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) closeMenu(); });

  headerElem.append(titleElem, buttonGroupElem, burgerBtn);

  // Create canvas with lists and add list button
  const canvasElem = dom.create({ tag: 'div', className: 'board__canvas' });
  const listsElem = dom.create({ tag: 'div', className: 'board__lists' });

  // Create lists
  listStore.getLists().forEach((list) => {
    const listElem = createList({ ...list });
    listsElem.appendChild(listElem);
  });

  const addListButtonElem = createButton({
    size: 'md',
    className: 'board__add-list-button',
    children: [
      createIcon({ name: 'plus-sign', size: 20, className: 'board__add-list-button-icon', type: 'stroke' }),
      dom.create({ tag: 'span', textContent: 'Add another list' }),
    ],
  });
  addListButtonElem.addEventListener('click', handleAddList);
  canvasElem.append(listsElem, addListButtonElem);

  rootElem.append(headerElem, canvasElem);

  // Subscribe to cards store
  const unsubscribe = listStore.subscribe((state) => {
    dom.lists.update(listsElem, state);
  });

  // Register component for cleanup
  // TODO: check if it's correct to register rootElem
  reactive.register(rootElem, unsubscribe);

  listsElem.addEventListener('list:add-card', handleListEvents);
  listsElem.addEventListener('list:menu', handleListEvents);
  listsElem.addEventListener('card:delete', handleCardEvents);
  listsElem.addEventListener('card:edit', handleCardEvents);
  listsElem.addEventListener('card:move-left', handleCardEvents);
  listsElem.addEventListener('card:move-right', handleCardEvents);

  return rootElem;
};
