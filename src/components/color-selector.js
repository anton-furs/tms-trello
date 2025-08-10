import { dom } from '@utils';
import { createIcon } from '@components';

const COLORS = ['cool-gray', 'indian-red', 'sky-magenta', 'african-violet', 'silver-lake-blue', 'air-force-blue'];

const createColorElem = (color, value) => {
  const colorElem = dom.create({
    tag: 'label',
    className: `color-selector__label color-selector--${color}`,
    dataset: { value: color },
  });

  const inputElem = dom.create({
    tag: 'input',
    className: 'color-selector__input',
    attributes: { type: 'radio', name: 'color', value: color },
  });
  inputElem.checked = color === value;

  const iconElem = createIcon({ name: 'check-mark', size: 24, className: 'color-selector__icon', type: 'stroke' });

  colorElem.append(inputElem, iconElem);

  inputElem.addEventListener('change', (e) => {
    const targetElem = e.target;
    const checkedElem = targetElem.closest('.color-selector__label');
    checkedElem.classList.add('color-selector__label--checked');
  });

  return colorElem;
};

export const createColorSelector = ({ value }) => {
  const rootElem = dom.create({ tag: 'div', className: 'color-selector' });

  COLORS.forEach((color) => {
    const colorElem = createColorElem(color, value);
    rootElem.appendChild(colorElem);
  });

  return rootElem;
};
