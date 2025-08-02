import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { Header } from '@components/header.js';
import { Board } from '@components/board.js';

const App = () => {
  const container = createElement({ tag: 'div', className: 'playground' });
  const title = createElement({ tag: 'p', textContent: 'Alex playground' });
  const [boardHeader, boardColumns] = Board();

  container.append(title);
  container.append(Header());
  container.append(boardHeader, boardColumns);
  
  return container;
}; 

const root = document.querySelector('#root');
root.append(App()); 
 