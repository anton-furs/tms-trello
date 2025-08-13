import { dom } from '@utils/dom';
import { createIcon } from '@components';

export const createSelect = ({ value, options }) => {
  const rootElem = dom.create({ tag: 'div', className: 'select', dataset: { value: value ? value : options[0] } });

  let isOpen = false;

  const handleSelectClick = () => {
    isOpen = !isOpen;
    selectContentElem.dataset.open = isOpen ? 'true' : 'false';
  };

  const selectTriggerTitleElem = dom.create({
    tag: 'p',
    className: 'select__trigger-title',
    textContent: value ? value : options[0],
  });

  const selectTriggerElem = dom.create({
    tag: 'button',
    className: 'select__trigger',
    children: [
      selectTriggerTitleElem,
      createIcon({ name: 'unfold-more', size: 24, className: 'select__trigger-icon', type: 'stroke' }),
    ],
  });
  selectTriggerElem.addEventListener('click', handleSelectClick);

  const selectContentElem = dom.create({ tag: 'div', className: 'select__content' });
  selectContentElem.dataset.open = 'false';

  options.forEach((option) => {
    const selectOptionElem = dom.create({ tag: 'button', className: 'select__option' });
    selectOptionElem.textContent = option;
    selectContentElem.append(selectOptionElem);

    selectOptionElem.addEventListener('click', () => {
      selectTriggerTitleElem.textContent = option;
      rootElem.dataset.value = option;
      handleSelectClick();
    });
  });

  // Close select on any option click
  document.addEventListener(
    'click',
    (e) => {
      if (!rootElem.contains(e.target)) {
        isOpen = false;
        selectContentElem.dataset.open = 'false';
      }
    },
    { capture: true }
  );

  rootElem.append(selectTriggerElem, selectContentElem);

  return rootElem;
};
