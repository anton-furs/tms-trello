import '@styles/main.scss';
import { createElement } from '@utils/dom';
import { createAddEditModal } from '@components/modal-add-card';
import { createCard } from '@components/card';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container', attributes: {'id': 'myId'} });
  const title = createElement({ tag: 'p', textContent: 'Vera' });
  container.appendChild(title);
  
  const card = createCard({title: 'Доработка ручной блокировки кредитов', 
    text: 'Необходимо реализовать доработку функциональности по блокировке кредитов ЮЛ, требования в приложенных файлах. Проработка алгоритма расчета, переоценки, пересчета доступного лимита после погашений, новых выда и т.д. Учет лимита при выдачах (операции на договоре, sordpay). Исключение отрицательных значений лимита.',
    user: 'Vera Kolodinskaya'
    })
  container.appendChild(card);

  // const but = createElement({ tag: 'button', textContent: 'Add' });
  // const  add = () => {
  // const modal = createAddEditModal();
  // container.appendChild(modal);
  // modal.showModal();
  // }
  // but.addEventListener('click', add);
  // container.appendChild(but);
  
  let arrUsers =[];

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error('Данные не найдены!')
      }
      else {
        return response.json();
      }
    })
    .then(users => users.map(elem => arrUsers.push(elem.name) ))

arrUsers.map(e => console.log('элемент', e))
 console.log('массив', arrUsers)


  return container;
};

const root = document.querySelector('#root');
root.append(App());



