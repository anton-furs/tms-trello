import { dom } from '@utils';
import { createIcon } from '@components';

export const createDropdownMenu = ({ title, options = [], color = 'cool-gray' }) => {
  const rootElem = dom.create({ tag: 'div', className: 'dropdown-menu', dataset: { color } });

  let isOpen = false;

  const handleDropdownMenuClick = () => {
    isOpen = !isOpen;
    dropdownMenuContentElem.dataset.open = isOpen ? 'true' : 'false';
  };

  const dropdownMenuTriggerElem = dom.create({
    tag: 'button',
    className: 'dropdown-menu__trigger',
    dataset: { action: 'menu' },
    children: [
      createIcon({ name: 'kebab-menu-horizontal', size: 24, className: 'dropdown-menu__dots-icon', type: 'fill' }),
    ],
  });
  dropdownMenuTriggerElem.addEventListener('click', () => {
    handleDropdownMenuClick();
  });

  const dropdownMenuContentElem = dom.create({ tag: 'div', className: 'dropdown-menu__content' });
  dropdownMenuContentElem.dataset.open = 'false';
  dropdownMenuContentElem.addEventListener('click', (e) => {
    const clickedElement = e.target.closest('[data-action]');
    if (clickedElement) {
      handleDropdownMenuClick();
    }
  });

  const dropdownMenuContentTitleElem = dom.create({ tag: 'h3', className: 'dropdown-menu__content-title' });
  dropdownMenuContentTitleElem.textContent = title;
  dropdownMenuContentElem.append(dropdownMenuContentTitleElem);

  options.forEach(({ action, label }) => {
    const dropdownMenuContentItemElem = dom.create({
      tag: 'button',
      className: 'dropdown-menu__content-item',
      dataset: { action },
    });
    dropdownMenuContentItemElem.textContent = label;
    dropdownMenuContentElem.append(dropdownMenuContentItemElem);
  });

  // Close dropdown menu on any option click
  document.addEventListener(
    'click',
    (e) => {
      if (!rootElem.contains(e.target)) {
        isOpen = false;
        dropdownMenuContentElem.dataset.open = 'false';
      }
    },
    { capture: true }
  );

  rootElem.append(dropdownMenuTriggerElem, dropdownMenuContentElem);

  return rootElem;
};
