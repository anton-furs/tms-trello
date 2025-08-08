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
    // TODO: open modal to confirm clear all
  };

  const handleClearDone = () => {
    // TODO: open modal to confirm clear done
    //cardStore.removeCardsByListName('Done');
    console.log('board:clear-done');
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
  headerElem.append(titleElem, buttonGroupElem);

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
