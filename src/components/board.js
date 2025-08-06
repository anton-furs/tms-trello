import { dom } from '@utils/dom';

export const createBoard = ({ name }) => {
  const rootElem = dom.create({ tag: 'main', className: 'board' });

  const headerElem = dom.create({ tag: 'header', className: 'board__header' });
  const titleElem = dom.create({ tag: 'p', className: 'board__name', textContent: name });
  headerElem.append(titleElem);

  const listsElem = dom.create({ tag: 'div', className: 'board__lists' });

  rootElem.append(headerElem, listsElem);

  return rootElem;
};
