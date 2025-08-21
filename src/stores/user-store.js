export const userStore = {
  users: [],
  getUsers() {
    return [...userStore.users];
  },
  setUsers(users) {
    userStore.users = [...users];
  },
};
