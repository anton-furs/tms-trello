import { dom } from '@utils/dom';

export const createInput = ({ value, placeholder = 'Title', type = 'text' }) => {
  const input = dom.create({ tag: 'input', className: 'input', attributes: { placeholder, type } });
  if (value) input.value = value;
  return input;
};
