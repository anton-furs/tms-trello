import { createList, createCard } from '@components';
import { cardStore } from '@stores';

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
      update: (element, state, listId) => {
        const listElem = element.querySelector(`[data-id="${listId}"]`);
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
    update: (element, state) => {
      const currentLists = Array.from(element.querySelectorAll('.list'));

      // Add list
      state.forEach((list) => {
        if (!currentLists.some((listElem) => listElem.dataset.id === list.id)) {
          const listElem = createList({ ...list });
          element.appendChild(listElem);
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
      update: () => {},
    },
    move: {
      right: () => {},
      left: () => {},
    },
  },

  // Methods to update the cards
  cards: {
    update: (element, state) => {
      const listElem = element.closest('.list');
      const currentCards = Array.from(element.querySelectorAll('.card'));

      // Add cards
      state.forEach((card) => {
        if (!currentCards.some((c) => c.dataset.id === card.id)) {
          const cardElem = createCard({ ...card });
          element.appendChild(cardElem);
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
