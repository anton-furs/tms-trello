import { dom } from '../utils/dom.js';

export const createBadge = ({ textContent }) => {
  const badgeElem = dom.create({ tag: 'div', className: `badge badge--cool-gray` });
  badgeElem.textContent = textContent;

  return badgeElem;
};
