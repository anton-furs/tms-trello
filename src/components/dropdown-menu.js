import { dom } from '@utils';
import { createIcon } from '@components';

export const createDropdownMenu = () => {
  const rootElem = dom.create({ tag: 'div', className: 'dropdown-menu' });

  let isOpen = false;

  const dropdownMenuTriggerElem = dom.create({
    tag: 'button',
    className: 'dropdown-menu__trigger',
    dataset: { action: 'menu' },
    children: [
      createIcon({ name: 'kebab-menu-horizontal', size: 24, className: 'dropdown-menu__dots-icon', type: 'fill' }),
    ],
  });
  dropdownMenuTriggerElem.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    dropdownMenuContentElem.dataset.open = isOpen ? 'true' : 'false';
  });

  const dropdownMenuContentElem = dom.create({ tag: 'div', className: 'dropdown-menu__content' });
  dropdownMenuContentElem.dataset.open = 'false';

  rootElem.append(dropdownMenuTriggerElem, dropdownMenuContentElem);

  return rootElem;
};
