import dayjs from 'dayjs';
import { generateUniqueId } from '@utils/nanoid';
import { appStore } from '@stores/app-store';

const LIST_LIMITS = { 'In Progress': 5 };

export const cardStore = {
  subscribers: new Set(),

  // Subscribe to card changes
  subscribe: (listId, callback) => {
    const subscriber = { listId, callback };
    cardStore.subscribers.add(subscriber);
    return () => cardStore.subscribers.delete(subscriber);
  },

  // Notify subscribers about card changes
  notify: (listId, state, operation = 'update', cardId = null) => {
    cardStore.subscribers.forEach((subscriber) => {
      if (listId) {
        if (subscriber.listId === listId) subscriber.callback(state, operation, cardId);
      } else {
        subscriber.callback(state, operation, cardId);
      }
    });
  },

  // Get all cards
  getCards: () => appStore.getState().cards,

  // Get cards by list id
  getCardsByListId: (listId) => appStore.getState().cards.filter((card) => card.listId === listId),

  // Get card by id
  getCardById: (id) => appStore.getState().cards.find((card) => card.id === id),

  // Check list limit
  isListLimitReached: (listId) => {
    const list = appStore.getState().lists.find((list) => list.id === listId);
    const cards = cardStore.getCardsByListId(listId);
    if (cards.length >= LIST_LIMITS[list.name]) return true;
    return false;
  },

  // Add a card
  addCard: ({ listId, title, description, assignee }) => {
    const card = {
      id: generateUniqueId(),
      listId,
      title,
      description,
      assignee,
      createdAt: dayjs().toISOString(),
    };
    // Add check if list "In Progress" has 3 cards
    const list = appStore.getState().lists.find((list) => list.id === listId);
    if (list.name === 'In Progress') {
      const cards = cardStore.getCardsByListId(listId);
      if (cards.length >= 3) return;
    } else {
      appStore.setState({ cards: [...appStore.getState().cards, card] });

      // Notify only the specific list
      cardStore.notify(
        listId,
        appStore.getState().cards.filter((card) => card.listId === listId),
        'add'
      );
      return card;
    }
  },

  // Update card { title, description, assignee }
  updateCard: (id, updates) => {
    const listId = appStore.getState().cards.find((card) => card.id === id).listId;
    appStore.setState({
      cards: appStore.getState().cards.map((card) => (card.id === id ? { ...card, ...updates } : card)),
    });
    cardStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId),
      'update',
      id
    );
  },

  // Remove card
  removeCard: (id) => {
    const listId = appStore.getState().cards.find((card) => card.id === id).listId;
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.id !== id) });
    cardStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId),
      'remove'
    );
  },

  // Remove all cards by list name
  removeCardsByListName: (listName) => {
    const list = appStore.getState().lists.find((list) => list.name === listName);
    if (!list) return;
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.listId !== list.id) });
    cardStore.notify(
      list.id,
      appStore.getState().cards.filter((card) => card.listId === list.id),
      'remove'
    );
  },

  // Remove all cards
  removeAllCards: () => {
    const lists = appStore.getState().lists;
    appStore.setState({ cards: [] });
    lists.forEach((list) => {
      cardStore.notify(
        list.id,
        appStore.getState().cards.filter((card) => card.listId === list.id),
        'remove'
      );
    });
  },

  // Move card between lists
  moveCard: (id, direction) => {
    const card = appStore.getState().cards.find((card) => card.id === id);
    if (!card) return;

    const lists = appStore.getState().lists;
    const currentIndex = lists.findIndex((list) => list.id === card.listId);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= lists.length) return;

    const oldListId = card.listId;
    const newListId = lists[targetIndex].id;

    if (cardStore.isListLimitReached(newListId)) return true;

    appStore.setState({
      cards: appStore.getState().cards.map((card) => (card.id === id ? { ...card, listId: newListId } : card)),
    });

    const changedList = appStore.getState().lists.filter((list) => list.id === oldListId || list.id === newListId);

    // Notify both lists
    changedList.forEach((list) => {
      cardStore.notify(
        list.id,
        appStore.getState().cards.filter((card) => card.listId === list.id),
        'reorder',
        id
      );
    });
    return false;
  },
};
