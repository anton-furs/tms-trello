import { dom } from '@utils/dom';
import { users } from '../api/users.js';
import { createIcon, createTextArea, createInput } from '@components';


export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText, assignee) => {
  const overlay = dom.create({ tag: 'div', className: 'modal-add-card__overlay' });
  const modalInput = createInput({value: bodyTitle});
  const modatTextArea = createTextArea(bodyText);
  const selectTitle = dom.create({ 
    tag: 'p', 
    textContent: assignee ? assignee : users[0], 
    className: 'modal-add-card__select-title'  
  });
  const iconSelect = createIcon({ 
    name: 'unfold-more', 
    size: 20, 
    className: 'card-content__arrow-icon', 
    type: 'stroke' });
  const optionUsers = dom.create({ tag: 'div', className: 'modal-add-card__select-option' });
  const selectBlock = dom.create({ 
    tag: 'div', 
    className: 'modal-add-card__select',
    children: [selectTitle, iconSelect, optionUsers]
  });
  users.forEach(elem => {
    const selectOption = dom.create({ 
      tag: 'p',
      className: 'modal-add-card__select-option__name',
      attributes: {'value': elem}, 
      textContent: elem
    });
    selectOption.addEventListener('click', (event) =>{
      selectTitle.textContent = elem;
      optionUsers.style.display = 'none';
      event.stopPropagation();
    })
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
  const buttonGroup = dom.create({ 
    tag: 'div', 
    className: 'modal__button-group', 
    children: [buttonCancel, buttonOk]
  });
  const titleElem = dom.create({ 
    tag: 'p', 
    className: 'modal__header-title', 
    textContent: cardTitle 
  });
  const headerElem = dom.create({ 
    tag: 'div', 
    className: 'modal__header',
    children: [titleElem] 
  });
  const bodyElem = dom.create({ 
    tag: 'div', 
    className: 'modal__body',
    children: [modalInput, modatTextArea] 
  });
  const footerElem = dom.create({ 
    tag: 'div', 
    className: 'modal__footer',
    children: [selectBlock, buttonGroup] 
  });
  const contentElem = dom.create({ 
    tag: 'div', 
    className: 'modal__content',
    children: [headerElem, bodyElem, footerElem]
  });
  const modalAddCard = dom.create({ 
    tag: 'div', 
    className: `modal modal--entry modal-add-card`,
    children: [contentElem] 
  });
  
  // Events
  const handleButtonGroupClick = (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (!clickedElement || !modalAddCard.contains(clickedElement)) return;

    const actionName = clickedElement.dataset.action;

    const event = new CustomEvent(`modal:${actionName}`, {
      detail: {
        title: modalInput.value,
        description: modatTextArea.value,
        assignee: selectTitle.textContent
      },
      bubbles: true,
      composed: true,
    });
    modalAddCard.dispatchEvent(event);
    overlay.remove();
  };

  const actionShow = (e) => {
    const styleOption = window.getComputedStyle(optionUsers);    
    if(styleOption.display === 'none'){
      optionUsers.style.display = 'block';
    }
    else{
      optionUsers.style.display = 'none';
    }
    e.stopPropagation();
  }
  
  selectBlock.addEventListener('click', actionShow);

  modalAddCard.addEventListener('click', handleButtonGroupClick);

  document.addEventListener('click', (e) => {
    const styleOption = window.getComputedStyle(optionUsers);
    if(!optionUsers.contains(e.target) && styleOption.display !== 'none'){
      optionUsers.style.display = 'none';
    }
  })
 
  overlay.addEventListener('click', (e) => {
    if(!modalAddCard.contains(e.target)){
      overlay.remove();
    }
  })
  
  overlay.append(modalAddCard);

  return overlay;
};

export const showAddEditCard = (element) => {
  element.style.display = 'block';
}