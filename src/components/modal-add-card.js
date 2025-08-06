import { createModal } from '@components/modal-base';
import { createTextArea } from '@components/textarea';
import { createInput } from '@components/input';
import { createCard, formatUser } from '@components/card';
import { buttonOk } from '@components/button';

export const createAddEditModal = (cardTitle = 'Add a card', bodyTitle, bodyText, card ={}) => {
  const modalInput = createInput(bodyTitle);
  const modatTextArea = createTextArea(bodyText);
  const user = '';
  const modalAddCard = createModal({ title: cardTitle, bodyModal: [modalInput, modatTextArea], footerButton: [buttonOk] });

  const cardAddEdit = (event) => {
    if (card.idCard){
      const titleCard = document.getElementById(card.idTitle);
      titleCard.textContent = modalInput.value;
      const textCard = document.getElementById(card.idText);
      textCard.textContent = modatTextArea.value;
      const userCard = document.getElementById(card.idUser);
      userCard.textContent = user ? formatUser(user) : '';
    }
    else{
      const cardNew = createCard({ title: modalInput.value, text: modatTextArea.value, user: user ? user : ''});
      const root = document.getElementById('myId');
      root.appendChild(cardNew);       
    }
    modalAddCard.remove();
  }
  buttonOk.addEventListener('click', cardAddEdit, { once: true });
  return modalAddCard;
}