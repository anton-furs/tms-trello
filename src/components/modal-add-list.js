import { dom } from '@utils/dom';
import { createInput, createModalBase } from '@components';

export const createAddListModal = (value) => {
  const inputElem = createInput({ value: value || '', placeholder: 'List name' });

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
    title: 'Add new list',
    body: [inputElem],
    footer: [buttonGroupElem],
  });

  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modal.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        name: inputElem.value,
        color: 'cool-gray',
      },
      bubbles: true,
      composed: true,
    });
    modal.dispatchEvent(event);
    modal.close();
    modal.remove();
  };

  modal.addEventListener('click', handleButtonGroupClick);

  return modal;
};
