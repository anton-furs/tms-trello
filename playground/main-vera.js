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


async function processData() {
  try {
    // Выполняем запрос
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // Проверяем успешность запроса
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Преобразуем ответ в JSON
    const data = await response.json();

    // Проверяем, что data является массивом
    if (Array.isArray(data)) {
      // Обрабатываем массив
      data.forEach(item => {
        // Ваша логика обработки каждого элемента массива
        console.log(item.name);
      });
    } else {
      console.error('Полученные данные не являются массивом:', data);
    }
  } catch (error) {
    // Обрабатываем ошибки
    console.error('Ошибка при обработке данных:', error);
  }
}

// Вызываем функцию для начала обработки
processData();


  return container;
};

const root = document.querySelector('#root');
root.append(App());



