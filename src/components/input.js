import { createElement } from '@utils/dom';

export const createInput = (text) => {
  const input = createElement({ tag: 'input', className: 'input', attributes: {'placeholder': 'Title', 'type': 'text'} });
  if (text) {
    input.value = text;
  }
  return input;
}