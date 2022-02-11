

export const compareArraysByProperty = (
  firstArray: any[],
  secondArray: any[],
  property: string
): boolean => {
  for (let el of firstArray) {
    if (!secondArray.some((el2) => el2[property] === el[property]))
      return false;
  }
  for (let el of secondArray) {
    if (!firstArray.some((el2) => el2[property] === el[property]))
      return false;
  }
  return true;
};
