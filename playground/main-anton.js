import '@styles/main.scss';
import { dom } from '@utils/dom';
import { boardStore } from '@stores';
import { createHeader, createBoard } from '@components';

const App = () => {
  const container = dom.create({ tag: 'div', className: 'container' });

  const header = createHeader();
  const board = createBoard({ name: boardStore.getBoard().name });
  container.append(header, board);

  return container;
};

const root = document.querySelector('#root');
root.append(App());
