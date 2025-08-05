import '@styles/main.scss';
import { createElement } from '@utils/dom';
//import { modalAddCard } from '@components/modal-add-card';
import { createCard } from '@components/card';

const App = () => {
  const container = createElement({ tag: 'div', className: 'container' });
  const title = createElement({ tag: 'p', textContent: 'Vera' });
  container.appendChild(title);
  
  const card = createCard({title: 'Выпить пива', 
    text: 'Выпить пива с рыбкой. И всякоко многое. Не знаю, что еще мне сказать, чтоб попасть в многоточие. вав ываыва ывпывпывп ыпывпывпывп ывпыувп ывпывуп',
    user: 'Vera Kolodinskaya'
    })
  container.appendChild(card);
  
  return container;
};

const root = document.querySelector('#root');
root.append(App());



