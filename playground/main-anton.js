import '@styles/main.scss';
import { dom } from '@utils/dom';
import { appStore } from '@stores';
import { createIcon } from '@components';

import trelloIcon from '../public/trello-logo.svg?raw';

const App = () => {
  const container = dom.create({ tag: 'div', className: 'container' });
  const title = dom.create({ tag: 'p', textContent: 'Anton' });
  container.appendChild(title);

  const icon = createIcon({ svg: trelloIcon, size: 24, type: 'fill' });
  container.appendChild(icon);

  // Display app state
  console.log(appStore.getState());

  return container;
};

const root = document.querySelector('#root');
root.append(App());
