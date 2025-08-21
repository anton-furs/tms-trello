import { dom, sync, reactive } from '@utils';
import {
  createButton,
  createIcon,
  createList,
  createAddListModal,
  createConfirmModal,
  createBoardHeader,
  createAddEditModal,
} from '@components';
import { boardStore, listStore, cardStore } from '@stores';

export const createBoard = ({ name }) => {
  const rootElem = dom.create({ tag: 'main', className: 'board' });

  const handleListEvents = (e) => {
    switch (e.type) {
      case 'list:add-card':
        if (cardStore.isListLimitReached(e.detail.listId)) {
          const modal = createConfirmModal({
            title: 'Too many tasks in progress',
            message: `You can't add more than 10 tasks to the "In Progress" column. Please complete current tasks before starting new ones.`,
          });
          document.body.appendChild(modal);
          modal.showModal();
        } else {
          const modalAddCard = createAddEditModal();
          document.body.appendChild(modalAddCard);
          modalAddCard.showModal();
          modalAddCard.addEventListener('modal:confirm', (elem) => {
            const data = elem.detail;
            if (data.title.trim(' ') && data.description.trim(' ')) {
              cardStore.addCard({ listId: e.detail.listId, ...data });
            }
          });
        }
        break;

      case 'list:edit':
        const list = listStore.getListById(e.detail.listId);
        const modalEdit = createAddListModal({ title: 'Edit list', ...list });
        document.body.appendChild(modalEdit);
        modalEdit.showModal();
        modalEdit.addEventListener('modal:confirm', (e) => {
          const data = e.detail;
          listStore.updateList(list.id, data);
        });
        break;

      case 'list:delete':
        const listToDelete = listStore.getListById(e.detail.listId);
        const modalDelete = createConfirmModal({
          title: 'Delete list',
          message: `Are you sure you want to delete list "${listToDelete.name}"? This action cannot be undone.`,
        });
        document.body.appendChild(modalDelete);
        modalDelete.showModal();
        modalDelete.addEventListener('modal:confirm', () => {
          listStore.removeList(listToDelete.id);
        });
        break;

      default:
        break;
    }
  };

  const handleCardEvents = (e) => {
    switch (e.type) {
      case 'card:delete':
        const modalDelete = createConfirmModal({
          title: 'Delete card',
          message: 'Are you sure you want to delete this task? This action cannot be undone.',
        });
        document.body.appendChild(modalDelete);
        modalDelete.showModal();
        modalDelete.addEventListener('modal:confirm', () => {
          cardStore.removeCard(e.detail.cardId);
        });
        break;

      case 'card:edit':
        const card = cardStore.getCardById(e.detail.cardId);
        const modalEdit = createAddEditModal('Edit card', card.title, card.description, card.assignee);
        document.body.appendChild(modalEdit);
        modalEdit.showModal();
        modalEdit.addEventListener('modal:confirm', (elem) => {
          const data = elem.detail;
          if (data.title.trim(' ') && data.description.trim(' ')) {
            cardStore.updateCard(card.id, data);
          }
        });
        break;

      case 'card:move':
        if (cardStore.moveCard(e.detail.cardId, e.detail.direction)) {
          const modalMove = createConfirmModal({
            title: 'Too many tasks in progress',
            message: `You can't add more than 10 tasks to the "In Progress" column. Please complete current tasks before starting new ones.`,
          });
          document.body.appendChild(modalMove);
          modalMove.showModal();
        }
        break;

      default:
        break;
    }
  };

  const handleBoardHeaderEvents = (e) => {
    switch (e.type) {
      case 'board:clear-all':
        const modalClearAll = createConfirmModal({
          title: 'Clear all cards',
          message: 'Are you sure you want to delete tasks? This action cannot be undone.',
        });
        document.body.appendChild(modalClearAll);
        modalClearAll.showModal();
        modalClearAll.addEventListener('modal:confirm', () => {
          cardStore.removeAllCards();
        });
        break;

      case 'board:clear-done':
        const modalClearDone = createConfirmModal({
          title: 'Clear done cards',
          message: 'Are you sure you want to delete done tasks? This action cannot be undone.',
        });
        document.body.appendChild(modalClearDone);
        modalClearDone.showModal();
        modalClearDone.addEventListener('modal:confirm', () => {
          cardStore.removeCardsByListName('Done');
        });
        break;

      default:
        break;
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
  reactive.register(rootElem, unsubscribe);

  boardHeaderElem.addEventListener('board:clear-all', handleBoardHeaderEvents);
  boardHeaderElem.addEventListener('board:clear-done', handleBoardHeaderEvents);

  listsElem.addEventListener('list:add-card', handleListEvents);
  listsElem.addEventListener('list:edit', handleListEvents);
  listsElem.addEventListener('list:delete', handleListEvents);

  listsElem.addEventListener('card:delete', handleCardEvents);
  listsElem.addEventListener('card:edit', handleCardEvents);
  listsElem.addEventListener('card:move', handleCardEvents);

  return rootElem;
};
