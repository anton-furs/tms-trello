import { dom } from '@utils';

export const createBoardMenuMobile = () => {
  const rootElem = dom.create({ tag: 'dialog', className: 'board-menu-mobile' });

  return rootElem;
};
