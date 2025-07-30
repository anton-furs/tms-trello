import '@styles/main.scss';
import { createElement } from '@utils/dom';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Alex' });
  container.appendChild(title);

  return container;
};

const root = document.querySelector('#root');
root.append(App());
