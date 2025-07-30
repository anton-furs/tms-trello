import './styles/main.scss';
import { createElement } from './utils/dom';
import { Header } from './components/header.js';
import { Board } from './components/board.js';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  return container;
};

const root = document.querySelector('#root');
root.append(Header(), Board());
