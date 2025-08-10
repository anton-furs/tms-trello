import { dom } from '@utils/dom';
import { createInput, createModalBase, createColorSelector } from '@components';

export const createAddListModal = (value) => {
  const nameInputElem = createInput({ value: value || '', placeholder: 'List name' });

  const colorSelectorElem = createColorSelector({ value: 'cool-gray' });

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
    body: [nameInputElem],
    footer: [colorSelectorElem, buttonGroupElem],
    variant: 'entry',
  });

  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modal.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;
    const colorInputElem = colorSelectorElem.querySelector('input[name="color"]:checked');

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        name: nameInputElem.value,
        color: colorInputElem.value,
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
