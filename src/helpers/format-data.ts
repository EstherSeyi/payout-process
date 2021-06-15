export const getOptions = (currencies: Object) => {
  const result = [];
  for (const value of Object.entries(currencies)) {
    result.push({
      label: value[0],
      value: value[1],
    });
  }

  return result;
};
