import dayjs from 'dayjs';
import { dom, formatUser } from '@utils';
import { createIcon } from '@components';
import { cardStore } from '@stores';

export const createCard = ({ id, title, description, assignee, createdAt }) => {
  const rootElem = dom.create({ tag: 'div', className: 'card', dataset: { id } });
  const createdAtFormated = dayjs(createdAt).format('MMMM D, YYYY [at] HH:mm');
  const moveLeftButtonElem = dom.create({
    tag: 'div',
    className: 'card-content__move-button',
    dataset: { action: 'move', direction: 'left' },
    children: [
      createIcon({
        name: 'chevron-left',
        size: 18,
        className: 'card-content__move-button-icon',
        type: 'stroke',
      }),
    ],
  });

  const titleElem = dom.create({ tag: 'div', className: 'card-content__title', textContent: title });

  const deleteCardButton = dom.create({
    tag: 'div',
    className: 'card-content__delete-button',
    dataset: { action: 'delete' },
    children: [
      createIcon({
        name: 'delete-bin',
        size: 18,
        className: 'card-content__move-button-icon card-content__delete-button-icon',
        type: 'stroke',
      }),
    ],
  });

  const titleContainerElem = dom.create({
    tag: 'div',
    className: 'card-content__title-container',
    children: [titleElem, deleteCardButton],
  });
  const descriptionElem = dom.create({
    tag: 'div',
    className: 'card-content__description',
    textContent: description,
  });
  const assigneeElem = dom.create({
    tag: 'div',
    className: 'card-content__assignee',
    textContent: formatUser(assignee),
  });
  const dateElem = dom.create({
    tag: 'div',
    className: 'card-content__date',
    textContent: createdAtFormated,
  });
  const infoElem = dom.create({
    tag: 'div',
    className: 'card-content__info',
    children: [assigneeElem, dateElem],
  });

  const cardBodyElem = dom.create({
    tag: 'div',
    className: 'card-content__body',
    dataset: { action: 'edit' },
    children: [titleContainerElem, descriptionElem, infoElem],
  });

  const moveRightButton = dom.create({
    tag: 'div',
    className: 'card-content__move-button',
    dataset: { action: 'move', direction: 'right' },
    children: [
      createIcon({
        name: 'chevron-right',
        size: 18,
        className: 'card-content__move-button-icon',
        type: 'stroke',
      }),
    ],
  });

  const cardContent = dom.create({
    tag: 'div',
    className: 'card-content',
    children: [moveLeftButtonElem, cardBodyElem, moveRightButton],
  });

  // functions change style for hover cards
  const addStyleClass = (element = []) => {
    element.forEach((elem) => elem.classList.add('card-content__move-button-hover'));
  };
  const removeStyleClass = (element = []) => {
    element.forEach((elem) => elem.classList.remove('card-content__move-button-hover'));
  };
  const hoverMoveButton = (event) => {
    const arrList = document.querySelectorAll('.list');
    let arrCardStart = cardStore.getCardsByListId(arrList[0].dataset.id);
    arrCardStart = arrCardStart.map((elem) => elem.id);
    let arrCardEnd = cardStore.getCardsByListId(arrList[arrList.length - 1].dataset.id);
    arrCardEnd = arrCardEnd.map((elem) => elem.id);
    if (event.type === 'mouseenter') {
      if (arrCardStart.includes(rootElem.dataset.id)) {
        addStyleClass([moveRightButton]);
      } else if (arrCardEnd.includes(rootElem.dataset.id)) {
        addStyleClass([moveLeftButtonElem]);
      } else {
        addStyleClass([moveLeftButtonElem, moveRightButton]);
      }
    } else if (event.type === 'mouseleave') {
      if (arrCardStart.includes(rootElem.dataset.id)) {
        removeStyleClass([moveRightButton]);
      } else if (arrCardEnd.includes(rootElem.dataset.id)) {
        removeStyleClass([moveLeftButtonElem]);
      } else {
        removeStyleClass([moveLeftButtonElem, moveRightButton]);
      }
    }
  };
  rootElem.addEventListener('mouseenter', hoverMoveButton);
  rootElem.addEventListener('mouseleave', hoverMoveButton);

  // Handle card click
  const handleCardClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !rootElem.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;
    const direction = clickedElement.dataset.direction;
    const listId = rootElem.closest('.list').dataset.id;

    const event = new CustomEvent(`card:${actionName}`, {
      detail: {
        cardId: id,
        listId: listId,
        direction: direction,
      },
      bubbles: true,
      composed: true,
    });
    rootElem.dispatchEvent(event);
  };
  rootElem.addEventListener('click', handleCardClick);

  rootElem.append(cardContent);
  return rootElem;
};
