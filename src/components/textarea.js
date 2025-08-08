import { dom } from '@utils/dom';

export const createTextArea = (text) => {
  const textArea = dom.create({ tag: 'textarea', className: 'textarea', attributes: { placeholder: 'Description' } });
  if (text) {
    textArea.value = text;
  }
  return textArea;
};
