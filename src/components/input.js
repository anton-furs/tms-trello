import { dom } from '@utils/dom';

export const createInput = (text) => {
  const input = dom.create({ tag: 'input', className: 'input', attributes: { placeholder: 'Title', type: 'text' } });
  if (text) {
    input.value = text;
  }
  return input;
};
