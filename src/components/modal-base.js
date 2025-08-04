import { createElement } from '@utils/dom';
import { buttonCancel, buttonOk } from '@components/button';

export const createModal = ({ title: title, bodyModal = [], footerModal = [] }) => {
  const modalWindow = createElement({ tag: 'dialog', className: `modal` });
  
  const header = createElement({ tag: 'div', className: 'modal-header' });
  modalWindow.append(header);
  const titleModal = createElement({ tag: 'p', className: 'modal-header__title', textContent: title });
  header.append(titleModal);
  
  const body = createElement({ tag: 'div', className: 'modal-body' });
  modalWindow.append(body);
  bodyModal.forEach(value => body.appendChild(value));

  const footerModalBlock = createElement({ tag: 'div', className: 'modal-footer' });
  modalWindow.append(footerModalBlock);
  footerModal.forEach(value => footerModalBlock.appendChild(value));
  const footerModalButton = createElement({ tag: 'div', className: 'modal-footer__button' });
  footerModalBlock.append(footerModalButton);
  footerModalButton.append(buttonCancel, buttonOk);

  const closeModal = () => {modalWindow.close()}
  buttonCancel.addEventListener('click', closeModal);
  
  return modalWindow;
}

