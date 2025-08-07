import { createElement } from '@utils/dom';
import { createIcon } from '@components/icon';
import { createAddEditModal } from '@components/modal-add-card';
import { cardsStore } from '@stores/cards-store';
import { generateUniqueId } from '@utils/nanoid';
import { createModalConfirm } from '@components/modal-confirm';

const formatDate = () => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const date = new Date();
  return date.toLocaleDateString('en-US', options);
}

export const formatUser = (userName) => {
  const arrayWord = userName.split(' ');
  const firstLetters = arrayWord.map(value => value.charAt(0));
  return firstLetters.join('').toUpperCase();
}

export const createCard = ({ title: title, text: text, user: user, date: date}) => {
  const idCard = generateUniqueId();
  const dateCardNew = date ? date : formatDate();
  const svgArrowLeft = createIcon({ name: 'chevron-left', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  const arrowLeft = createElement({ tag: 'div', className: 'card-content__arrow', children: [svgArrowLeft] });
  const titleCard = createElement({ tag: 'div', className: 'card-content__body-block__title', textContent: title, attributes: {'id': generateUniqueId()} });
  const basketDelete = createIcon({ name: 'delete-bin', size: 18, className: 'card-content__arrow-icon card-content__body-block__delete-icon', type: 'stroke' });
  const divBasket = createElement({ tag: 'div', className: 'card-content__body-block__delete', attributes: {'id': generateUniqueId()}, children: [basketDelete] });
  const titleBlock = createElement({ tag: 'div', className: 'card-content__body-block', children: [titleCard, divBasket] });
  const textCard = createElement({ tag: 'div', className: 'card-content__body-text', textContent: text , attributes: {'id': generateUniqueId()}});
  const userCard = createElement({ tag: 'div', className: 'card-content__body-info__user', textContent: formatUser(user), attributes: {'id': generateUniqueId()} });
  const dateCard = createElement({ tag: 'div', className: 'card-content__body-info__date', textContent: dateCardNew });
  const infoCard = createElement({ tag: 'div', className: 'card-content__body-info', children: [userCard, dateCard] });
  const bodyCard = createElement({ tag: 'div', className: 'card-content__body', children: [titleBlock, textCard, infoCard]});
  const svgArrowRight = createIcon({ name: 'chevron-right', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  const arrowRight = createElement({ tag: 'div', className: 'card-content__arrow', children: [svgArrowRight] });
  const cardContent = createElement({ tag: 'div', className: 'card-content', children: [arrowLeft, bodyCard, arrowRight] });
  const card = createElement({ tag: 'div', className: 'card', attributes: {id: idCard}, children: [cardContent] });
  
  // Events
  bodyCard.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'DIV') {
      const modalWin = createAddEditModal('Edit card', titleCard.textContent, textCard.textContent, 
                                          {idCard: card.id, idUser: userCard.id, idTitle: titleCard.id, idText: textCard.id});
      card.append(modalWin);
      modalWin.showModal();
    }
    else {
      const modalConfirm = createModalConfirm(idCard);
      card.append(modalConfirm);
      modalConfirm.showModal();
    }
  });
  return card;
}