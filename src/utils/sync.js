import { createList, createCard } from '@components';
import { cardStore } from '@stores';
import { formatUser } from '@utils';

export const sync = {
  // Methods to update the list element
  list: {
    badge: {
      update: (listElem) => {
        const badgeElem = listElem.querySelector('.badge');
        const cardCount = cardStore.getCardsByListId(listElem.dataset.id).length;
        badgeElem.textContent = cardCount.toString();
        badgeElem.dataset.color = listElem.dataset.color;
      },
    },
    menu: {
      update: (listElem) => {
        const dropdownMenuElem = listElem.querySelector('.dropdown-menu');
        dropdownMenuElem.dataset.color = listElem.dataset.color;
      },
    },
    content: {
      update: (parentElem, state, listId) => {
        const listElem = parentElem.querySelector(`[data-id="${listId}"]`);
        const list = state.find((list) => list.id === listId);
        const nameElem = listElem.querySelector('.list__name');
        nameElem.textContent = list.name;
        listElem.dataset.color = list.color;

        // Update badge and menu
        sync.list.badge.update(listElem);
        sync.list.menu.update(listElem);
      },
    },
  },

  // Methods to update the lists
  lists: {
    update: (parentElem, state) => {
      const currentLists = Array.from(parentElem.querySelectorAll('.list'));

      // Add list
      state.forEach((list) => {
        if (!currentLists.some((listElem) => listElem.dataset.id === list.id)) {
          const listElem = createList({ ...list });
          parentElem.appendChild(listElem);
        }
      });

      // Remove list
      currentLists.forEach((listElem) => {
        if (!state.some((list) => list.id === listElem.dataset.id)) {
          listElem.remove();
        }
      });
    },
  },

  // Methods to update the card element
  card: {
    content: {
      update: (parentElem, state, cardId) => {
        const cardElem = parentElem.querySelector(`[data-id="${cardId}"]`);
        const card = state.find((card) => card.id === cardId);

        if (cardElem) {
          cardElem.querySelector('.card-content__body-block__title').textContent = card.title;
          cardElem.querySelector('.card-content__body-text').textContent = card.description;
          cardElem.querySelector('.card-content__body-info__user').textContent = formatUser(card.assignee);
        }
      },
    },
    move: {
      right: () => {},
      left: () => {},
    },
  },

  // Methods to update the cards
  cards: {
    update: (parentElem, state) => {
      const listElem = parentElem.closest('.list');
      const currentCards = Array.from(parentElem.querySelectorAll('.card'));

      // Add cards
      state.forEach((card) => {
        if (!currentCards.some((c) => c.dataset.id === card.id)) {
          const cardElem = createCard({ ...card });
          parentElem.appendChild(cardElem);
        }
      });

      // Remove card
      currentCards.forEach((cardElem) => {
        if (!state.some((card) => card.id === cardElem.dataset.id)) {
          cardElem.remove();
        }
      });

      // Update badge
      sync.list.badge.update(listElem);
    },
  },
};
