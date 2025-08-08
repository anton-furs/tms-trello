import { createList, createCard } from '@components';

export const sync = {
  // Methods to update the list element
  list: {
    badge: {
      update: (element, listId) => {
        const badgeElem = element.closest('.list').querySelector('.badge');
        const cardCount = cardsStore.getCardsByListId(listId).length;
        badgeElem.textContent = cardCount.toString();
      },
    },
    name: {
      update: () => {},
    },
    color: {
      update: () => {},
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
      const currentCards = Array.from(element.querySelectorAll('.card'));

      // Add cards
      state.forEach((card) => {
        if (!currentCards.some((c) => c.dataset.id === card.id)) {
          const cardElem = createCard({ ...card });
          element.appendChild(cardElem);
          sync.list.badge.update(cardElem, card.listId);
        }
      });

      // Remove card
      currentCards.forEach((cardElem) => {
        if (!state.some((card) => card.id === cardElem.dataset.id)) {
          cardElem.remove();
          sync.list.badge.update(cardElem, card.listId);
        }
      });
    },
  },
};
