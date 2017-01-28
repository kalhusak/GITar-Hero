export const getFromStorage = (propName, defaultValue = true) =>
  typeof localStorage[propName] !== 'undefined' ? JSON.parse(localStorage[propName]) : defaultValue;
