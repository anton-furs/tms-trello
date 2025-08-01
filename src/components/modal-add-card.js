import { createModal } from '@components/modal-base';
import { textArea } from '@components/textarea';
import { inputModal } from '@components/input';

export const modalAddCard = createModal({ title: 'Add a card', className: 'modal-add-card', bodyModal: [inputModal, textArea]});