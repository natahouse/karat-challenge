export const isDate = (str: string): boolean => {
  return !isNaN(Date.parse(str));
};
