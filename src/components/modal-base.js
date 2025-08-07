import { dom } from '@utils/dom';
import { generateUniqueId } from '@utils/nanoid';
import { createCancelButton } from '@components';

export const createModal = ({ title: title, bodyModal = [], footerModal = [], footerButton = [], style: style }) => {
  const titleModal = dom.create({ tag: 'p', className: 'modal-header__title', textContent: title });
  const header = dom.create({ tag: 'div', className: 'modal-header', children: [titleModal] });
  const body = dom.create({ tag: 'div', className: 'modal-body' });
  bodyModal.forEach((value) => body.appendChild(value));
  const footerModalButton = dom.create({ tag: 'div', className: 'modal-footer__button', children: [buttonCancel] });
  footerButton.forEach((value) => footerModalButton.appendChild(value));
  const footerModalBlock = dom.create({ tag: 'div', className: 'modal-footer', children: [footerModalButton] });
  footerModal.forEach((value) => footerModalBlock.appendChild(value));
  style = style ? `modal ${style}` : 'modal';
  const modalWindow = dom.create({
    tag: 'dialog',
    className: style,
    attributes: { id: generateUniqueId() },
    children: [header, body, footerModalBlock],
  });

  // Events
  const closeModal = () => {
    modalWindow.close();
    modalWindow.remove();
  };
  createCancelButton.addEventListener('click', closeModal);

  return modalWindow;
};
