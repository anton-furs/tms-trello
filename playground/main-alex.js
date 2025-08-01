import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { header } from '@components/header.js';
import { board } from '@components/board.js';

const App = () => {
  const container = createElement({ tag: 'div', className: 'playground' });
  const title = createElement({ tag: 'p', textContent: 'Alex playground' });

  container.appendChild(title);
  container.append(header(), board());

  return container;
};

const root = document.querySelector('#root');
root.append(App()); 
 