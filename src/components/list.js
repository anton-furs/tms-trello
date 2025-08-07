import { dom } from '@utils/dom.js';
import { reactive } from '@utils/reactive.js';
import { createBadge, createIcon, createButton } from '@components';
import { cardStore } from '@stores';

export const createList = ({ id, name }) => {
  const rootElem = dom.create({ tag: 'div', className: 'list', dataset: { id } });

  // Create list header
  const headerElem = dom.create({ tag: 'div', className: 'list__header' });
  const titleElem = dom.create({ tag: 'p', className: 'list__name', textContent: name });

  // Create list menu group
  const menuGroupElem = dom.create({ tag: 'div', className: 'list__menu-group' });
  const cardCountElem = createBadge({ textContent: cardStore.getCardsByListId(id).length.toString() });
  const menuButtonElem = dom.create({
    tag: 'button',
    className: 'list__menu-btn',
    children: [createIcon({ name: 'kebab-menu-horizontal', size: 24, className: 'list__dots-icon', type: 'fill' })],
  });
  menuGroupElem.append(cardCountElem, menuButtonElem);
  headerElem.append(titleElem, menuGroupElem);

  // Create list body
  const bodyElem = dom.create({ tag: 'div', className: 'list__body' });
  cardStore.getCards().forEach((card) => {
    if (card.listId === id) {
      const cardElem = dom.create({ tag: 'div', className: 'card', dataset: { id: card.id } });
      bodyElem.appendChild(cardElem);
    }
  });

  // Create list footer
  const footerElem = dom.create({ tag: 'div', className: 'list__footer' });
  const addCardButtonElem = createButton({
    size: 'md',
    className: 'list__add-card-button',
    children: [
      createIcon({ name: 'plus-sign', size: 20, className: 'list__add-card-button-icon', type: 'stroke' }),
      dom.create({ tag: 'span', textContent: 'Add a card' }),
    ],
  });
  footerElem.append(addCardButtonElem);
  rootElem.append(headerElem, bodyElem, footerElem);

  // Subscribe to cards store
  const unsubscribe = cardStore.subscribe(id, (state) => {
    dom.cards.update(bodyElem, state, id);
  });

  // Register component for cleanup
  reactive.register(rootElem, unsubscribe);

  return rootElem;
};
