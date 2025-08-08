import { dom } from '@utils/dom';

export const createButton = ({ type = 'button', size = 'md', className, textContent, children = [] }) => {
  const buttonElem = dom.create({
    tag: 'button',
    className: `button button--${size} ${className}`,
    textContent,
    children,
  });
  buttonElem.type = type;

  return buttonElem;
};

export const createOkButton = createButton({ className: 'button modal-button__ok', textContent: 'OK' });
export const createCancelButton = createButton({ className: 'button modal-button__cancel', textContent: 'Cancel' });
