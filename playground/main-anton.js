import '@styles/main.scss';
import { createElement } from '@utils';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Anton' });
  container.appendChild(title);

  return container;
};

const root = document.querySelector('#root');
root.append(App());
