import { dom } from '@utils/dom';

export const createModalBase = ({ title, body = [], footer = [], variant = 'entry' }) => {
  const rootElem = dom.create({ tag: 'dialog', className: `modal modal--${variant}` });

  let clickStartedInside = false;

  // Create content container
  const contentElem = dom.create({ tag: 'div', className: 'modal__content' });

  // Create header
  const headerElem = dom.create({ tag: 'div', className: 'modal__header' });
  const titleElem = dom.create({ tag: 'p', className: 'modal__header-title', textContent: title });
  headerElem.appendChild(titleElem);

  // Create body
  const bodyElem = dom.create({ tag: 'div', className: 'modal__body' });
  body.forEach((value) => bodyElem.appendChild(value));

  // Create footer
  const footerElem = dom.create({ tag: 'div', className: 'modal__footer' });
  footer.forEach((value) => footerElem.appendChild(value));

  contentElem.append(headerElem, bodyElem, footerElem);

  rootElem.addEventListener('mousedown', (e) => {
    clickStartedInside = e.target !== rootElem;
  });

  rootElem.addEventListener('click', (e) => {
    if (e.target === rootElem && !clickStartedInside) {
      rootElem.close();
    }
  });

  rootElem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const confirmButton = rootElem.querySelector('[data-action="confirm"]');
      if (confirmButton) {
        confirmButton.click();
      }
    }

    if (e.key === 'Escape') {
      rootElem.close();
    }
  });

  rootElem.addEventListener('close', () => {
    rootElem.remove();
  });

  rootElem.append(contentElem);
  return rootElem;
};
