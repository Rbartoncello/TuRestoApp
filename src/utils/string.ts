const capitalizeWords = (str: string) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const procesarString = (str: string) => {
  const array = str.split('@');

  return array.map(word => {
    return capitalizeWords(word);
  });
};
