import '@styles/main.scss';
import { createElement } from '@utils/dom';

const root = document.querySelector('#root');
const title = createElement({ tag: 'p', textContent: 'Vera' });

root.appendChild(title);
