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

export const formatCurrency = (number: number) =>
  new Intl.NumberFormat().format(number);

export const formatInput = (stringNumber: string) => {
  console.log(stringNumber);
  return stringNumber.replace(/,/g, "");
};
