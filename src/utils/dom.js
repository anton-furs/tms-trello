export const dom = {
  // Method to create a DOM element
  create: ({ tag, className, textContent, attributes = {}, dataset = {}, children = [] }) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value ?? '');
      });
    }
    if (dataset) {
      Object.entries(dataset).forEach(([key, value]) => {
        element.dataset[key] = value ?? '';
      });
    }
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child instanceof Node) {
          element.appendChild(child);
        }
      });
    }
    return element;
  },

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
          const listElem = createList({
            id: list.id,
            boardId: list.boardId,
            name: list.name,
            color: list.color,
          });
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
        if (!currentCards.some((cardElem) => cardElem.dataset.id === card.id)) {
          const cardElem = createElement({ tag: 'div', className: 'card', dataset: { id: card.id } });
          element.appendChild(cardElem);
          dom.list.badge.update(cardElem, card.listId);
        }
      });

      // Remove card
      currentCards.forEach((cardElem) => {
        if (!state.some((card) => card.id === cardElem.dataset.id)) {
          cardElem.remove();
          dom.list.badge.update(cardElem, card.listId);
        }
      });
    },
  },
};
