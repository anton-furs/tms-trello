import dayjs from 'dayjs';
import { generateUniqueId } from '@utils/nanoid';
import { appStore } from '@stores/app-store';

export const cardsStore = {
  // Get all cards
  getCards: () => appStore.getState().cards,

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
