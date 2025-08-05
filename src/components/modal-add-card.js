import { createModal } from '@components/modal-base';
import { createTextArea } from '@components/textarea';
import { createInput } from '@components/input';

export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText) => {
  const modalInput = createInput(bodyTitle);
  const modatTextArea = createTextArea(bodyText);
  const modalAddCard = createModal({ title: cardTitle, bodyModal: [modalInput, modatTextArea]});
  return modalAddCard;
}