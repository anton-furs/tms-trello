import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { appStore } from '@stores/app-store';
import { createIcon } from '@components/icon';

import trelloIcon from '../public/trello-logo.svg?raw';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Anton' });
  container.appendChild(title);

  const icon = createIcon({ svg: trelloIcon, size: 24, type: 'fill' });
  container.appendChild(icon);

  // Display app state
  console.log(appStore.getState());

  return container;
};

const root = document.querySelector('#root');
root.append(App());
