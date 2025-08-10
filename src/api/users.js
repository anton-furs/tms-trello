// Get users data
const URL_FOR_GET_USERS = 'https://jsonplaceholder.typicode.com/users';
async function getUsersJson() {
  try {
    const response = await fetch(URL_FOR_GET_USERS);
    const users = await response.json();
    if (Array.isArray(users)){
      return users;
    }
    else {
      return [users];
    }
  } catch (error) {
    alert('Error getting users:', error);
    return null;
  }
}

export const getUsers = () =>{
  getUsersJson()
  .then(array => {
    if(array){
      return array;
    }
  })

}
  


