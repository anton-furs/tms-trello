import { userStore } from '@stores/user-store';

const URL_FOR_GET_USERS = 'https://jsonplaceholder.typicode.com/users';

// Get users data
export const fetchUsers = async () => {
  try {
    const res = await fetch(URL_FOR_GET_USERS);
    if (!res.ok) {
      throw new Error('Failed fetch users');
    }
    const data = await res.json();
    const userNames = data.map((user) => user.name);
    userStore.setUsers(userNames);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error:', err);
  }
};
