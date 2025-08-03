import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { appStore } from '@stores/app-store';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Anton' });
  container.appendChild(title);

  // Display app state
  console.log(appStore.getState());

  return container;
};

const root = document.querySelector('#root');
root.append(App());
