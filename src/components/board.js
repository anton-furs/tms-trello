import { dom } from '@utils/dom';
import { reactive } from '@utils/reactive';
import { createButton, createIcon, createList } from '@components';
import { cardStore, listStore } from '@stores';

export const createBoard = ({ id, name }) => {
  const rootElem = dom.create({ tag: 'main', className: 'board' });

  const handleClearAll = () => {
    cardStore.removeAllCards();
  };

  const handleClearDone = () => {
    cardStore.removeCardsByListName('Done');
  };

  const handleOpenAddListModal = () => {
    const event = new CustomEvent('addList', { detail: { boardId: id } });
    rootElem.dispatchEvent(event);
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
  headerElem.append(titleElem, buttonGroupElem);

  // Create canvas with lists and add list button
  const canvasElem = dom.create({ tag: 'div', className: 'board__canvas' });
  const listsElem = dom.create({ tag: 'div', className: 'board__lists' });

  // TODO: Create lists from listStore
  listStore.getLists().forEach((list) => {
    const listElem = createList({
      id: list.id,
      name: list.name,
    });
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
  addListButtonElem.addEventListener('click', handleOpenAddListModal);
  canvasElem.append(listsElem, addListButtonElem);

  rootElem.append(headerElem, canvasElem);

  // Subscribe to cards store
  const unsubscribe = cardStore.subscribe((state) => {
    dom.cards.update(listsElem, state);
  });

  // Register component for cleanup
  // TODO: check if it's correct to register rootElem
  reactive.register(rootElem, unsubscribe);

  return rootElem;
};
