import { createElement } from '@utils/dom';
import { generateUniqueId } from '@utils/nanoid'

export const createButton = ({className: className, textContent: textContent}) => {
  const button = createElement({ tag: 'button', className: className, textContent: textContent, attributes: {id: generateUniqueId()} });
  return button;
}

export const buttonOk = createButton({ className: 'button modal-button__ok', textContent: 'OK' });
export const buttonCancel = createButton({ className: 'button modal-button__cancel', textContent: 'Cancel' });