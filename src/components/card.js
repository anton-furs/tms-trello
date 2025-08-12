import dayjs from 'dayjs';
import { dom } from '@utils/dom';
import { createIcon } from '@components';
import { listStore } from '@stores';
//import { createAddEditModal } from '@components/modal-add-card';
//import { cardsStore } from '@stores/cards-store';
// import { generateUniqueId } from '@utils/nanoid';
//import { createModalConfirm } from '@components/modal-confirm';

export const formatUser = (userName) => {
  const arrayWord = userName.split(' ');
  const firstLetters = arrayWord.map((value) => value.charAt(0));
  return firstLetters.join('').toUpperCase();
};

export const createCard = ({ id, title, description, assignee, createdAt }) => {
  const rootElem = dom.create({ tag: 'div', className: 'card', dataset: { id } });

  const createdAtFormated = dayjs(createdAt).format('MMMM D, YYYY');

  const moveLeftButtonElem = dom.create({
    tag: 'div',
    className: 'card-content__arrow',
    dataset: { action: 'move-left' },
    children: [
      createIcon({
        name: 'chevron-left',
        size: 18,
        className: 'card-content__arrow-icon',
        type: 'stroke',
      }),
    ],
  });

  const titleElem = dom.create({ tag: 'div', className: 'card-content__body-block__title', textContent: title });

  const deleteCardButton = dom.create({
    tag: 'div',
    className: 'card-content__body-block__delete',
    dataset: { action: 'delete' },
    children: [
      createIcon({
        name: 'delete-bin',
        size: 18,
        className: 'card-content__arrow-icon card-content__body-block__delete-icon',
        type: 'stroke',
      }),
    ],
  });

  const titleBlockElem = dom.create({
    tag: 'div',
    className: 'card-content__body-block',
    children: [titleElem, deleteCardButton],
  });
  const descriptionElem = dom.create({
    tag: 'div',
    className: 'card-content__body-text',
    textContent: description,
  });
  const assigneeElem = dom.create({
    tag: 'div',
    className: 'card-content__body-info__user',
    textContent: formatUser(assignee),
  });
  const dateElem = dom.create({
    tag: 'div',
    className: 'card-content__body-info__date',
    textContent: createdAtFormated,
  });
  const infoElem = dom.create({ tag: 'div', className: 'card-content__body-info', children: [assigneeElem, dateElem] });

  const cardBodyElem = dom.create({
    tag: 'div',
    className: 'card-content__body',
    dataset: { action: 'edit' },
    children: [titleBlockElem, descriptionElem, infoElem],
  });

  const moveRightButton = dom.create({
    tag: 'div',
    className: 'card-content__arrow',
    dataset: { action: 'move-right' },
    children: [
      createIcon({
        name: 'chevron-right',
        size: 18,
        className: 'card-content__arrow-icon',
        type: 'stroke',
      }),
    ],
  });

  const cardContent = dom.create({
    tag: 'div',
    className: 'card-content',
    children: [moveLeftButtonElem, cardBodyElem, moveRightButton],
  });

  // Handle card click
  const handleCardClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !rootElem.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`card:${actionName}`, { detail: { cardId: id }, bubbles: true, composed: true });
    rootElem.dispatchEvent(event);
  };
  rootElem.addEventListener('click', handleCardClick);

  rootElem.append(cardContent);
  return rootElem;
};
