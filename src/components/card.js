import { createElement } from '@utils/dom';
import { createIcon } from '@components/icon';
import { createAddEditModal } from '@components/modal-add-card';

const formatDate = () => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const date = new Date();
  return date.toLocaleDateString('en-US', options);
}

const formatUser = (userName) => {
  const arrayWord = userName.split(' ');
  const firstLetters = arrayWord.map(value => value.charAt(0));
  return firstLetters.join('').toUpperCase();
}

export const createCard = ({ title: title, text: text, user: user, date: date}) => {
  const card = createElement({ tag: 'div', className: 'card' });
  const cardContent = createElement({ tag: 'div', className: 'card-content' });
  const arrowLeft = createElement({ tag: 'div', className: 'card-content__arrow'});
  const svgArrowLeft = createIcon({ name: 'chevron-left', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  const bodyCard = createElement({ tag: 'div', className: 'card-content__body'});
  const titleBlock = createElement({ tag: 'div', className: 'card-content__body-block' });
  const titleCard = createElement({ tag: 'p', className: 'card-content__body-block__title', textContent: title });
  const basketDelete = createIcon({ name: 'delete-bin', size: 18, className: 'card-content__arrow-icon card-content__body-block__delete', type: 'stroke' });
  const textCard = createElement({ tag: 'div', className: 'card-content__body-text', textContent: text });
  const infoCard = createElement({ tag: 'div', className: 'card-content__body-info' });
  const userCard = createElement({ tag: 'div', className: 'card-content__body-info__user', textContent: formatUser(user) });
  const dateCard = createElement({ tag: 'div', className: 'card-content__body-info__date', textContent: date ? date : formatDate() });
  const arrowRight = createElement({ tag: 'div', className: 'card-content__arrow'});
  const svgArrowRight = createIcon({ name: 'chevron-right', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  
  arrowLeft.append(svgArrowLeft);
  arrowRight.append(svgArrowRight);
  infoCard.append(userCard, dateCard);
  titleBlock.append(titleCard, basketDelete);
  bodyCard.append(titleBlock, textCard, infoCard);
  cardContent.append(arrowLeft, bodyCard, arrowRight);
  card.append(cardContent);
  
  // Events
  const showModal = () => {
    const modalWin = createAddEditModal('Edit card', titleCard.textContent, textCard.textContent);
    card.append(modalWin);
    modalWin.showModal();
  }
  bodyCard.addEventListener('click', showModal);

  return card;
}