import dayjs from 'dayjs';
import { generateUniqueId } from '@utils/nanoid';
import { appStore } from '@stores/app-store';

export const cardStore = {
  subscribers: new Set(),

  // Subscribe to card changes
  subscribe: (listId, callback) => {
    const subscriber = { listId, callback };
    cardStore.subscribers.add(subscriber);
    return () => cardStore.subscribers.delete(subscriber);
  },

  // Notify subscribers about card changes
  notify: (listId, state) => {
    cardStore.subscribers.forEach((subscriber) => {
      if (listId) {
        if (subscriber.listId === listId) subscriber.callback(state);
      } else {
        subscriber.callback(state);
      }
    });
  },

  // Get all cards
  getCards: () => appStore.getState().cards,

  // Get cards by list id
  getCardsByListId: (listId) => appStore.getState().cards.filter((card) => card.listId === listId),

  // Get card by id
  getCardById: (id) => appStore.getState().cards.find((card) => card.id === id),

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
    appStore.setState({ cards: [...appStore.getState().cards, card] });

    // Notify only the specific list
    cardStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId)
    );
    return card;
  },

  // Update card { title, description, assignee }
  updateCard: (id, updates) => {
    const listId = appStore.getState().cards.find((card) => card.id === id).listId;
    appStore.setState({
      cards: appStore.getState().cards.map((card) => (card.id === id ? { ...card, ...updates } : card)),
    });
    cardStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId)
    );
  },

  // Remove card
  removeCard: (id) => {
    const listId = appStore.getState().cards.find((card) => card.id === id).listId;
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.id !== id) });
    cardStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId)
    );
  },

  // Remove all cards by list name
  removeCardsByListName: (listName) => {
    const list = appStore.getState().lists.find((list) => list.name === listName);
    if (!list) return;
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.listId !== list.id) });
    cardStore.notify(
      list.id,
      appStore.getState().cards.filter((card) => card.listId === list.id)
    );
  },

  // Remove all cards
  removeAllCards: () => {
    const lists = appStore.getState().lists;
    appStore.setState({ cards: [] });
    lists.forEach((list) => {
      cardStore.notify(
        list.id,
        appStore.getState().cards.filter((card) => card.listId === list.id)
      );
    });
  },
};
