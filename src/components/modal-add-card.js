import { dom } from '@utils/dom';
import { createModalBase } from '@components/modal-base';
import { createTextArea } from '@components/textarea';
import { createInput } from '@components/input';
import { createCard, formatUser } from '@components/card';

export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText, card = {}) => {
  const modalInput = createInput({value: bodyTitle});
  const modatTextArea = createTextArea(bodyText);
  const user = '';
  const buttonGroup = dom.create({ tag: 'div', className: 'modal__button-group' });
  const buttonOk = dom.create({
    tag: 'button',
    textContent: 'Confirm',
    className: 'modal__button modal__button--solid',
    dataset: { action: 'confirm' },
  });
  const buttonCancel = dom.create({
    tag: 'button',
    textContent: 'Cancel',
    className: 'modal__button modal__button--tinted',
    dataset: { action: 'cancel' },
  });
  buttonGroup.append(buttonCancel, buttonOk);
  const modalAddCard = createModalBase({
    title: cardTitle,
    body: [modalInput, modatTextArea],
    footer: [buttonGroup],
  });

  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modalAddCard.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        title: modalInput.value,
        description: modatTextArea.value,
        assignee: ''
      },
      bubbles: true,
      composed: true,
    });
    modalAddCard.dispatchEvent(event);
    modalAddCard.close();
    modalAddCard.remove();
  };

  modalAddCard.addEventListener('click', handleButtonGroupClick);

  const cardAddEdit = (event) => {
    if (card.idCard) {
      const titleCard = document.getElementById(card.idTitle);
      titleCard.textContent = modalInput.value;
      const textCard = document.getElementById(card.idText);
      textCard.textContent = modatTextArea.value;
      const userCard = document.getElementById(card.idUser);
      userCard.textContent = user ? formatUser(user) : '';
    } else {
      const cardNew = createCard({ title: modalInput.value, text: modatTextArea.value, user: user ? user : '' });
    }
    modalAddCard.remove();
  };
  //buttonOk.addEventListener('click', cardAddEdit, { once: true });
  return modalAddCard;
};
