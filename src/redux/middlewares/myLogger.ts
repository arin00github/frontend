const myLogger = (store: any) => (next: any) => (action: any) => {
  console.log(action);
  const result = next(action);
  return result;
};

export default myLogger;
