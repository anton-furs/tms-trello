import { createElement } from '../utils/dom.js';

export const Header = () => {
  const logo = createElement({
    tag: 'img',
    className: 'header__logo',
    attributes: {
      src: '/trello-logo.svg',
      alt: 'Trello logo',
    },
  });

  const title = createElement({
    tag: 'span',
    className: 'header__title',
    textContent: 'Trello',
  });

  const left = createElement({
    tag: 'div',
    className: 'header__left',
    children: [logo, title],
  });

  const time = createElement({
    tag: 'div',
    className: 'header__right',
    textContent: getTimeString(),
  });

  //Обновлять время каждую минуту
  setInterval(() => {
    time.textContent = getTimeString();
  }, 1000);

  return createElement({
    tag: 'header',
    className: 'header',
    children: [left, time],
  });
};
// отображать формат AM/PM
function getTimeString() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${pad(hours)}:${pad(minutes)} ${ampm}`;
}

function pad(n) {
  return n < 10 ? '0' + n : n.toString();
}

