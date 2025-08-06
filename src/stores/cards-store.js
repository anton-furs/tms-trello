import dayjs from 'dayjs';
import { generateUniqueId } from '@utils/nanoid';
import { appStore } from '@stores/app-store';

export const cardsStore = {
  subscribers: new Set(),

  // Subscribe to card changes
  subscribe: (listId, callback) => {
    const subscriber = { listId, callback };
    cardsStore.subscribers.add(subscriber);
    return () => cardsStore.subscribers.delete(subscriber);
  },

  // Notify subscribers about card changes
  notify: (listId, state) => {
    cardsStore.subscribers.forEach((subscriber) => {
      if (subscriber.listId === listId) subscriber.callback(state);
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
    cardsStore.notify(
      listId,
      appStore.getState().cards.filter((card) => card.listId === listId)
    );
    return card;
  },

  // Update card { title, description, assignee }
  updateCard: (id, updates) => {
    appStore.setState({
      cards: appStore.getState().cards.map((card) => (card.id === id ? { ...card, ...updates } : card)),
    });
  },

  // Remove card
  removeCard: (id) => {
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.id !== id) });
  },

  // Remove all cards by list name
  removeCardsByListName: (listName) => {
    const list = appStore.getState().lists.find((list) => list.name === listName);
    if (!list) return;
    appStore.setState({ cards: appStore.getState().cards.filter((card) => card.listId !== list.id) });
  },

  // Remove all cards
  removeAllCards: () => {
    appStore.setState({ cards: [] });
  },
};
