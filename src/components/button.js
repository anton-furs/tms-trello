import { createElement } from '@utils/dom';

export const createButton = ({className: className, textContent: textContent}) => {
  const button = createElement({ tag: 'button', className: className, textContent: textContent });
  return button;
}

export const buttonOk = createButton({ className: 'button-modal button-modal_black', textContent: 'OK' });
export const buttonCancel = createButton({ className: 'button-modal button-modal_gray', textContent: 'Cancel' });