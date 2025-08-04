import { createElement } from '@utils/dom';

import deleteBin from '@assets/icons/svg/delete-bin.svg?raw';
import plusSign from '@assets/icons/svg/plus-sign.svg?raw';
import unfoldMore from '@assets/icons/svg/unfold-more.svg?raw';
import chevronLeft from '@assets/icons/svg/chevron-left-01.svg?raw';
import chevronRight from '@assets/icons/svg/chevron-right-01.svg?raw';

const icons = {
  'delete-bin': deleteBin,
  'plus-sign': plusSign,
  'unfold-more': unfoldMore,
  'chevron-left': chevronLeft,
  'chevron-right': chevronRight,
};

export const createIcon = ({ svg, name = 'delete-bin', size = 24, className = '', type = 'fill' }) => {
  // Create template and set content
  const templateElem = createElement({ tag: 'template' });
  svg ? (templateElem.innerHTML = svg) : (templateElem.innerHTML = icons[name]);

  // Get SVG element
  const svgElem = templateElem.content.firstChild;

  // Set path stroke color
  svgElem.querySelectorAll('path').forEach((path) => {
    if (type === 'fill') path.setAttribute('fill', 'currentColor');
    if (type === 'stroke') {
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
    }
  });

  // Set size and class attributes
  svgElem.setAttribute('width', size);
  svgElem.setAttribute('height', size);
  if (className) svgElem.setAttribute('class', className);

  // Clone and return the node
  const icon = templateElem.content.cloneNode(true);
  return icon;
};
