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
  return firstLetters.join('');
}

export const createCard = ({ title: title, text: text, user: user, date: date}) => {
  const card = createElement({ tag: 'div', className: 'card' });

  const cardContent = createElement({ tag: 'div', className: 'card-content' });
  card.append(cardContent);

  const arrowLeft = createElement({ tag: 'div', className: 'card-content__arrow'});
  const svgArrowLeft = createIcon({ name: 'chevron-left', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  arrowLeft.append(svgArrowLeft);
  cardContent.append(arrowLeft);

  const bodyCard = createElement({ tag: 'div', className: 'card-content__body'});
  const showModal = () => {
    const modalWin = createAddEditModal('Edit card', titleCard.textContent, textCard.textContent);
    card.append(modalWin);
    modalWin.showModal();
  }

  bodyCard.addEventListener('click', showModal);

  const titleCard = createElement({ tag: 'p', className: 'card-content__body-title', textContent: title });
  bodyCard.append(titleCard);
  const textCard = createElement({ tag: 'div', className: 'card-content__body-text', textContent: text });
  bodyCard.append(textCard);
  const infoCard = createElement({ tag: 'div', className: 'card-content__body-info' });
  const userCard = createElement({ tag: 'div', className: 'card-content__body-info__user', textContent: formatUser(user) });
  if (!date) {date = formatDate()}
  const dateCard = createElement({ tag: 'div', className: 'card-content__body-info__date', textContent: date });
  infoCard.append(userCard);
  infoCard.append(dateCard);
  bodyCard.append(infoCard);
  cardContent.append(bodyCard);

  const arrowRight = createElement({ tag: 'div', className: 'card-content__arrow'});
  const svgArrowRight = createIcon({ name: 'chevron-right', size: 18, className: 'card-content__arrow-icon', type: 'stroke' });
  arrowRight.append(svgArrowRight);
  cardContent.append(arrowRight);
  
  return card;
}