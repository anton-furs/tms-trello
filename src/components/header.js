import { createElement } from '../utils/dom.js';
import dayjs from 'dayjs';

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
const getTimeString = () => dayjs().format('hh:mm A');

