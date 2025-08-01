import { createElement } from '@utils/dom';
import { buttonCancel, buttonOk } from '@components/button';

export const createModal = ({ title: title, bodyModal = [], footerModal = [] }) => {
  const modalWindow = createElement({ tag: 'div', className: `modal` });
  if (title) {
    const modalTitle = createElement({ tag: 'p', className: 'modal-title', textContent: title });
    modalWindow.append(modalTitle);
  }

  bodyModal.forEach(value => modalWindow.appendChild(value));

  const footerModalBlock = createElement({ tag: 'div', className: 'modal-footer' });
  modalWindow.append(footerModalBlock);

  footerModal.forEach(value => footerModalBlock.appendChild(value));

  const footerModalButton = createElement({ tag: 'div', className: 'modal-footer__button' });
  footerModalBlock.append(footerModalButton);
  footerModalButton.append(buttonCancel, buttonOk);
  return modalWindow;
}