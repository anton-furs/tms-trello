import { dom } from '@utils/dom';
import { userStore } from '@stores';
import { createTextArea, createInput, createSelect } from '@components';

export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText, assignee) => {
  const overlay = dom.create({ tag: 'div', className: 'modal-add-card__overlay' });

  let clickStartedInside = false;

  const modalInput = createInput({ value: bodyTitle });
  const modatTextArea = createTextArea(bodyText);

  const selectElem = createSelect({ value: assignee, options: userStore.getUsers() });

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
  const buttonGroup = dom.create({
    tag: 'div',
    className: 'modal__button-group',
    children: [buttonCancel, buttonOk],
  });
  const titleElem = dom.create({
    tag: 'p',
    className: 'modal__header-title',
    textContent: cardTitle,
  });
  const headerElem = dom.create({
    tag: 'div',
    className: 'modal__header',
    children: [titleElem],
  });
  const bodyElem = dom.create({
    tag: 'div',
    className: 'modal__body',
    children: [modalInput, modatTextArea],
  });
  const footerElem = dom.create({
    tag: 'div',
    className: 'modal__footer',
    children: [selectElem, buttonGroup],
  });
  const contentElem = dom.create({
    tag: 'div',
    className: 'modal__content',
    children: [headerElem, bodyElem, footerElem],
  });
  const modalAddCard = dom.create({
    tag: 'div',
    className: `modal modal--entry modal-add-card`,
    children: [contentElem],
  });

  // Events
  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modalAddCard.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;
    const assignee = selectElem.dataset.value;

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        title: modalInput.value,
        description: modatTextArea.value,
        assignee: assignee,
      },
      bubbles: true,
      composed: true,
    });
    modalAddCard.dispatchEvent(event);
    overlay.remove();
  };

  modalAddCard.addEventListener('click', handleButtonGroupClick);

  overlay.addEventListener('mousedown', (e) => {
    clickStartedInside = e.target !== overlay;
  });

  overlay.addEventListener('click', (e) => {
    if (!modalAddCard.contains(e.target) && !clickStartedInside) {
      overlay.remove();
    }
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const confirmButton = overlay.querySelector('[data-action="confirm"]');
      if (confirmButton) {
        confirmButton.click();
      }
    }

    if (e.key === 'Escape') {
      overlay.remove();
    }
  });

  overlay.append(modalAddCard);

  overlay.showModal = () => {
    overlay.style.display = 'block';
    setTimeout(() => {
      modalInput.focus();
    }, 0);
  };

  return overlay;
};
