import { dom } from '@utils/dom';
import { createModalBase } from '@components/modal-base';
import { createTextArea } from '@components/textarea';
import { createInput } from '@components/input';
import { users } from '../api/users.js';
import { createIcon } from '@components';


export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText, assignee) => {
  const modalInput = createInput({value: bodyTitle});
  const modatTextArea = createTextArea(bodyText);
  const buttonGroup = dom.create({ tag: 'div', className: 'modal__button-group' });
  const selectBlock = dom.create({ 
    tag: 'select', 
    className: 'modal-add-card__select'
  });
  
  const iconSelect = createIcon({ name: 'unfold-more', size: 20, className: 'list__add-card-button-icon', type: 'stroke' });
  const optionUsers = dom.create({ tag: 'div', className: 'modal-add-card__select-option' });
  selectBlock.append(optionUsers);
  users.forEach(elem => {
    const selectOption = dom.create({ 
      tag: 'option',
      className: 'modal-add-card__select-option__name',
      attributes: {'value': elem}, 
      textContent: elem
    });
      if (assignee === elem){
        selectOption.setAttribute('selected', 'selected');
      }
     optionUsers.append(selectOption);
  })
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
    footer: [selectBlock, buttonGroup],
  });


  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modalAddCard.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        title: modalInput.value,
        description: modatTextArea.value,
        assignee: selectBlock.value
      },
      bubbles: true,
      composed: true,
    });
    modalAddCard.dispatchEvent(event);
    modalAddCard.close();
    modalAddCard.remove();
  };

  modalAddCard.addEventListener('click', handleButtonGroupClick);

  return modalAddCard;
};
