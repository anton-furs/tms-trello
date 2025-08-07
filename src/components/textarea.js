import { createElement } from '@utils/dom';

export const createTextArea = (text) => {
  const textArea = createElement({ tag: 'textarea', className: 'textarea', attributes: {'placeholder': 'Description'}});
  if (text) {
    textArea.value = text;
  }
  return textArea;
}
