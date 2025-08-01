import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { modalAddCard } from '@components/modal-add-card';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Vera' });
  container.appendChild(title);
  
  container.appendChild(modalAddCard);

  return container;
};

const root = document.querySelector('#root');
root.append(App());



