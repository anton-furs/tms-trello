// Get users data
export let users = [];
const URL_FOR_GET_USERS = 'https://jsonplaceholder.typicode.com/users';

fetch(URL_FOR_GET_USERS)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(elem => users.push(elem.name));
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

  


