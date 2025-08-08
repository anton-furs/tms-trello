import dayjs from 'dayjs';
import { createPersistentStore } from '@stores/persistent-store';
import { generateUniqueId } from '@utils/nanoid';

const STORAGE_KEY = 'tms-trello-state';

const DEFAULT_BOARD = {
  id: generateUniqueId(),
  name: 'Team Project Board',
  background: 'url-to-image.jpg',
};

const DEFAULT_LIST_TITLES = ['Todo', 'In Progress', 'Done'];
const DEFAULT_LISTS = DEFAULT_LIST_TITLES.map((name) => {
  return {
    id: generateUniqueId(),
    boardId: DEFAULT_BOARD.id,
    name: name,
    color: 'cool-gray',
  };
});

const DEFAULT_APP_STATE = {
  board: DEFAULT_BOARD,
  lists: DEFAULT_LISTS,
  cards: [
    {
      id: generateUniqueId(),
      listId: DEFAULT_LISTS[0].id,
      title: 'Implement drag & drop for the card component to reorder cards within the same list',
      description:
        'Users should be able to drag and reorder task cards within the same column, with changes reflected in both the UI and backend. Enable users to click on a card and edit its title and description inside a popup with autosave or confirmation button.',
      assignee: 'Clementine Bauch',
      createdAt: dayjs().toISOString(),
    },
  ],
};

export const appStore = createPersistentStore({ key: STORAGE_KEY, initialState: DEFAULT_APP_STATE });
