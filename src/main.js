import '@styles/main.scss';
import { dom } from '@utils/dom';
import { boardStore } from '@stores';
import { createHeader, createBoard } from '@components';

const App = () => {
  const container = dom.create({ tag: 'div', className: 'container' });

  const header = createHeader();
  const board = createBoard({ id: boardStore.getBoard().id, name: boardStore.getBoard().name });
  container.append(header, board);

  return container;
};

const root = document.querySelector('#root');
root.append(App());
