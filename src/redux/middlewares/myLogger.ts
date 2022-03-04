const myLogger = (store) => (next) => (action) => {
  console.log(action);
  const result = next(action);
  return result;
};
