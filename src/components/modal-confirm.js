import { createModal } from '@components/modal-base';
import { createElement } from '@utils/dom';
import { buttonOk } from '@components/button';

export const createModalConfirm = (idCard) => {
  const textModal = createElement({ tag: 'div', className: 'modal-confirm__text', textContent: 'Are you sure you want to delete tasks? This action cannot be undone.' });
  const modal = createModal({ title: 'Confirm deletion', bodyModal: [textModal], style: 'modal-confirm', footerButton: [buttonOk]});

  const deleteCard = () => {
    const card = document.getElementById(idCard);
    card.remove();
  }
  buttonOk.addEventListener('click', deleteCard);

  return modal;
}