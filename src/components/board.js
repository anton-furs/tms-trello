import { dom, sync, reactive } from '@utils';
import {
  createButton,
  createIcon,
  createList,
  createAddListModal,
  createConfirmModal,
  createBoardHeader,
  createAddEditModal,
  showAddEditCard
} from '@components';
import { boardStore, listStore, cardStore } from '@stores';

export const createBoard = ({ name }) => {
  const rootElem = dom.create({ tag: 'main', className: 'board' });

  const handleListEvents = (e) => {
    if (e.type === 'list:add-card') {
      const modalAddCard = createAddEditModal();
      document.body.appendChild(modalAddCard);
      showAddEditCard(modalAddCard);
      modalAddCard.addEventListener('modal:confirm', (elem) => {
        const data = elem.detail;
        cardStore.addCard({listId: e.detail.listId,  ...data });
      });
    }
    if (e.type === 'list:edit') {
      const list = listStore.getListById(e.detail.listId);
      const modal = createAddListModal({ title: 'Edit list', ...list });
      document.body.appendChild(modal);
      modal.showModal();
      modal.addEventListener('modal:confirm', (e) => {
        const data = e.detail;
        listStore.updateList(list.id, data);
      });
    }
    if (e.type === 'list:delete') {
      const list = listStore.getListById(e.detail.listId);
      const modal = createConfirmModal({
        title: 'Delete list',
        message: `Are you sure you want to delete list "${list.name}"? This action cannot be undone.`,
      });
      document.body.appendChild(modal);
      modal.showModal();
      modal.addEventListener('modal:confirm', () => {
        listStore.removeList(list.id);
      });
    }
  };

  const handleCardEvents = (e) => {
    if (e.type === 'card:delete') {
      const modal = createConfirmModal({
        title: 'Delete card',
        message: 'Are you sure you want to delete this task? This action cannot be undone.',
      });
      document.body.appendChild(modal);
      modal.showModal();
      modal.addEventListener('modal:confirm', () => {
        cardStore.removeCard(e.detail.cardId);
      });
    }
    if (e.type === 'card:edit') {
      const card = cardStore.getCardById(e.detail.cardId);
      const modalAddCard = createAddEditModal(
        'Edit card', 
        card.title,
        card.description,
        card.assignee);
      document.body.appendChild(modalAddCard);
      showAddEditCard(modalAddCard);
      modalAddCard.addEventListener('modal:confirm', (elem) => {
        const data = elem.detail;
        cardStore.updateCard(card.id, data);
      });
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

  const handleBoardHeaderEvents = (e) => {
    if (e.type === 'board:clear-all') {
      const modal = createConfirmModal({
        title: 'Clear all cards',
        message: 'Are you sure you want to delete tasks? This action cannot be undone.',
      });
      document.body.appendChild(modal);
      modal.showModal();
      modal.addEventListener('modal:confirm', () => {
        cardStore.removeAllCards();
      });
    }
    if (e.type === 'board:clear-done') {
      const modal = createConfirmModal({
        title: 'Clear done cards',
        message: 'Are you sure you want to delete done tasks? This action cannot be undone.',
      });
      document.body.appendChild(modal);
      modal.showModal();
      modal.addEventListener('modal:confirm', () => {
        cardStore.removeCardsByListName('Done');
      });
    }
  };

  const handleAddList = () => {
    const modal = createAddListModal({ title: 'Add new list' });
    document.body.appendChild(modal);
    modal.showModal();
    modal.addEventListener('modal:confirm', (e) => {
      const data = e.detail;
      listStore.addList({ boardId: boardStore.getBoard().id, ...data });
    });
  };

  // Create header
  const boardHeaderElem = createBoardHeader({ name });

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

  rootElem.append(boardHeaderElem, canvasElem);

  // Subscribe to cards store
  const unsubscribe = listStore.subscribe((state, operation, listId) => {
    if (operation === 'update' && listId) {
      sync.list.content.update(listsElem, state, listId);
    } else {
      sync.lists.update(listsElem, state);
    }
  });

  // Register component for cleanup
  // TODO: check if it's correct to register rootElem
  reactive.register(rootElem, unsubscribe);

  boardHeaderElem.addEventListener('board:clear-all', handleBoardHeaderEvents);
  boardHeaderElem.addEventListener('board:clear-done', handleBoardHeaderEvents);

  listsElem.addEventListener('list:add-card', handleListEvents);
  listsElem.addEventListener('list:edit', handleListEvents);
  listsElem.addEventListener('list:delete', handleListEvents);

  listsElem.addEventListener('card:delete', handleCardEvents);
  listsElem.addEventListener('card:edit', handleCardEvents);
  listsElem.addEventListener('card:move-left', handleCardEvents);
  listsElem.addEventListener('card:move-right', handleCardEvents);

  return rootElem;
};
