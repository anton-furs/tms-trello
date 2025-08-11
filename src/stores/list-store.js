import { appStore } from '@stores/app-store';
import { generateUniqueId } from '@utils/nanoid';

export const listStore = {
  subscribers: new Set(),

  // Subscribe to app changes
  subscribe: (callback) => {
    listStore.subscribers.add(callback);
    return () => listStore.subscribers.delete(callback);
  },

  // Notify
  notify: (state, operation = 'update', listId = null) => {
    listStore.subscribers.forEach((callback) => {
      callback(state, operation, listId);
    });
  },

  // Get all lists
  getLists: () => appStore.getState().lists,

  // Get list by id
  getListById: (id) => appStore.getState().lists.find((list) => list.id === id),

  // Add list
  addList: ({ boardId, name, color }) => {
    const list = {
      id: generateUniqueId(),
      boardId,
      name,
      color,
    };
    appStore.setState({ lists: [...appStore.getState().lists, list] });
    listStore.notify(appStore.getState().lists, 'add', list.id);
  },

  // Update list { name, color }
  updateList: (id, updates) => {
    appStore.setState({
      lists: appStore.getState().lists.map((list) => (list.id === id ? { ...list, ...updates } : list)),
    });
    listStore.notify(appStore.getState().lists, 'update', id);
  },

  // Remove list by id
  removeList: (id) => {
    appStore.setState({ lists: appStore.getState().lists.filter((list) => list.id !== id) });
    listStore.notify(appStore.getState().lists, 'remove', id);
  },
};
