import { dom } from '../utils/dom.js';

export const createBadge = ({ label, color = 'cool-gray' }) => {
  const badgeElem = dom.create({ tag: 'div', className: `badge`, dataset: { color } });
  badgeElem.textContent = label;

  return badgeElem;
};
