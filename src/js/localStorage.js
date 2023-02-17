const LOCAL_STORAGE_WATCHED = 'movies-watched';
const LOCAL_STORAGE_QUEUE = 'movies-queue';

const setItem = (value, type) => {
  const key = keyType(type);
  if (!key) {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = type => {
  const key = keyType(type);
  if (!key) {
    return;
  }
  const value = window.localStorage.getItem(key);
  return JSON.parse(value);
};

const removeItem = (value, type) => {
  const key = keyType(type);
  if (!key) {
    return;
  }
  const list = getItem(type);
  if (!list) {
    return;
  }
  let idIndex = -1;
  const newList = list.filter((element, index) => element !== value);
  setItem(newList, type);
};

const keyType = type => {
  if (type === 'watched') {
    return LOCAL_STORAGE_WATCHED;
  }
  if (type === 'queue') {
    return LOCAL_STORAGE_QUEUE;
  }
  console.error('wronga type key in localStorage');
  return false;
};

export const moviesStorage = {
  setItem,
  getItem,
  removeItem,
};
