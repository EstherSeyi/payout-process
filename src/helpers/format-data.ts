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

export const formatCurrency = (number: number) => {
  if (isNaN(number)) {
    return "0.00";
  } else {
    return new Intl.NumberFormat().format(number);
  }
};

export const formatInput = (stringNumber: string) => {
  return stringNumber.replace(/,/g, "");
};
