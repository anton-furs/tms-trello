import { appStore } from '@stores/app-store';
import { generateUniqueId } from '@utils/nanoid';

export const listStore = {
  // Get all lists
  getLists: () => appStore.getState().lists,

  // Add list
  addList: ({ name, color }) => {
    const list = {
      id: generateUniqueId(),
      name,
      color,
    };
    appStore.setState({ lists: [...appStore.getState().lists, list] });
  },

  // Update list { name, color }
  updateList: (id, updates) => {
    appStore.setState({
      lists: appStore.getState().lists.map((list) => (list.id === id ? { ...list, ...updates } : list)),
    });
  },

  // Remove list by id
  removeList: (id) => {
    appStore.setState({ lists: appStore.getState().lists.filter((list) => list.id !== id) });
  },
};
