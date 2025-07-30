// Create DOM element
export const createElement = ({ tag, className, textContent, attributes = {}, dataset = {} }) => {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value ?? '');
    });
  }

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      element.dataset[key] = value ?? '';
    });
  }

  return element;
};
