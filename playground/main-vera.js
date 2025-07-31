import '@styles/main.scss';
import { createElement } from '@utils/dom';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Vera' });
  container.appendChild(title);
  const modalAddEditCard = createElement({ tag: 'div', className: 'modal-add-card' });
  container.appendChild(modalAddEditCard);
  const modalAddEditCardTitle = createElement({ tag: 'p', className: 'modal-add-card_title', textContent: 'Add a card' });
  modalAddEditCard.appendChild(modalAddEditCardTitle);
  const titleCard = createElement({ tag: 'input', className: 'input', attributes: {'placeholder': 'Title', 'type': 'text'} });
  modalAddEditCard.appendChild(titleCard);
  const textCard = createElement({ tag: 'textarea', className: 'textarea', attributes: {'placeholder': 'Description'} });
  modalAddEditCard.appendChild(textCard);
  const divButtonsBlock = createElement({ tag: 'div', className: 'modal-add-card_buttonsblock' });
  modalAddEditCard.appendChild(divButtonsBlock);
  const select = createElement({ tag: 'select', className: 'select' });
  divButtonsBlock.appendChild(select);
  // const options = createElement({ tag: 'option', textContent: 'Hello' });
  // select.appendChild(options);
  const divAllButton = createElement({ tag: 'div', className: 'modal-add-card_buttonsblock-button' });
  divButtonsBlock.appendChild(divAllButton);
  const buttonCancel = createElement({ tag: 'button', className: 'button-modal button-modal_gray', textContent: 'Cancel' });
  divAllButton.appendChild(buttonCancel);
  const buttonOk = createElement({ tag: 'button', className: 'button-modal button-modal_black', textContent: 'OK' });
  divAllButton.appendChild(buttonOk);
  return container;
};

const root = document.querySelector('#root');
root.append(App());



