import { dom } from '@utils/dom';
import { createModalBase } from '@components';

export const createConfirmModal = ({ title, message }) => {
  const textContentElem = dom.create({
    tag: 'div',
    className: 'modal-confirm__text',
    textContent: message,
  });

  const buttonGroupElem = dom.create({ tag: 'div', className: 'modal__button-group' });
  const confirmButtonElem = dom.create({
    tag: 'button',
    textContent: 'Confirm',
    className: 'modal__button modal__button--solid',
    dataset: { action: 'confirm' },
  });
  const cancelButtonElem = dom.create({
    tag: 'button',
    textContent: 'Cancel',
    className: 'modal__button modal__button--tinted',
    dataset: { action: 'cancel' },
  });
  buttonGroupElem.append(cancelButtonElem, confirmButtonElem);

  const modal = createModalBase({
    title: title,
    body: [textContentElem],
    footer: [buttonGroupElem],
    variant: 'confirm',
  });

  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modal.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`modal:${actionName}`, { bubbles: true, composed: true });
    modal.dispatchEvent(event);
    modal.close();
    modal.remove();
  };

  modal.addEventListener('click', handleButtonGroupClick);

  return modal;
};

// import { createModal } from '@components/modal-base';
// import { dom } from '@utils/dom';
// import { createOkButton } from '@components';

// export const createModalConfirm = (idCard) => {
//   const textModal = dom.create({
//     tag: 'div',
//     className: 'modal-confirm__text',
//     textContent: 'Are you sure you want to delete tasks? This action cannot be undone.',
//   });
//   const modal = createModal({
//     title: 'Confirm deletion',
//     bodyModal: [textModal],
//     style: 'modal-confirm',
//     footerButton: [createOkButton],
//   });

//   const deleteCard = () => {
//     const card = document.getElementById(idCard);
//     card.remove();
//   };
//   buttonOk.addEventListener('click', deleteCard);

//   return modal;
// };
