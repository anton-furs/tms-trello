import { createElement } from '@utils/dom';
import { generateUniqueId } from '@utils/nanoid';
import { buttonCancel } from '@components/button';

export const createModal = ({ title: title, bodyModal = [], footerModal = [], footerButton = [], style: style }) => {
  const titleModal = createElement({ tag: 'p', className: 'modal-header__title', textContent: title });
  const header = createElement({ tag: 'div', className: 'modal-header', children: [titleModal] });
  const body = createElement({ tag: 'div', className: 'modal-body' });
  bodyModal.forEach(value => body.appendChild(value));
  const footerModalButton = createElement({ tag: 'div', className: 'modal-footer__button', children: [buttonCancel]});
  footerButton.forEach(value => footerModalButton.appendChild(value));
  const footerModalBlock = createElement({ tag: 'div', className: 'modal-footer', children: [footerModalButton] });
  footerModal.forEach(value => footerModalBlock.appendChild(value));
  style = style ? `modal ${style}` : 'modal';
  const modalWindow = createElement({ tag: 'dialog', className: style, attributes: {id: generateUniqueId()}, children: [header, body, footerModalBlock] });
  
  // Events
  const closeModal = () => {
    modalWindow.close();
    modalWindow.remove();
  }
  buttonCancel.addEventListener('click', closeModal);
  
  return modalWindow;
}

