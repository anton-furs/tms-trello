import { appStore } from '@stores/app-store';

export const boardStore = {
  getBoard: () => appStore.getState().board,
};
