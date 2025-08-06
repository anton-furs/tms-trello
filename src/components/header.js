import dayjs from 'dayjs';
import { dom } from '@utils/dom';
import { createIcon } from '@components';
import trelloLogo from '../../public/trello-logo.svg?raw';

export const createHeader = () => {
  const getTimeString = () => {
    return dayjs().format('hh:mm A');
  };

  const rootElem = dom.create({ tag: 'header', className: 'header' });

  // Logo element
  const logoElem = dom.create({ tag: 'div', className: 'header__logo' });
  const iconElem = createIcon({ svg: trelloLogo, size: 24, className: 'header__icon', type: 'fill' });
  const titleElem = dom.create({ tag: 'p', className: 'header__title', textContent: 'Trello' });
  logoElem.append(iconElem, titleElem);

  // Time element
  const timeElem = dom.create({ tag: 'div', className: 'header__time', textContent: getTimeString() });

  let lastMinute = dayjs().minute();
  setInterval(() => {
    const currentMinute = dayjs().minute();
    if (currentMinute !== lastMinute) {
      timeElem.textContent = getTimeString();
      lastMinute = currentMinute;
    }
  }, 1000);

  rootElem.append(logoElem, timeElem);

  return rootElem;
};
