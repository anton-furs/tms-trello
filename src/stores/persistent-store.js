// This is a generic store that can be used to store any state in localStorage
export const createPersistentStore = ({ key, initialState }) => {
  const savedState = localStorage.getItem(key);
  let state = savedState ? JSON.parse(savedState) : { ...initialState };
  localStorage.setItem(key, JSON.stringify(state));

  const save = () => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  const getState = () => ({ ...state });

  const setState = (newState) => {
    state = { ...state, ...newState };
    save();
  };

  return { getState, setState };
};
