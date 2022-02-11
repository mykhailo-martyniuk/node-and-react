const compareArraysByProperty = (
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

const arr = [
  {
    id: "17",
    name: "cool",
    description: "group description sfsfs sdsd",
  },
  {
    id: "19",
    name: "coolest",
    description: "group description sfsfs sdsd",
  },

  {
    id: "19",
    name: "co",
    description: "group description sfsfs sdsd",
  },
];
const arr2 = [
  {
    id: "17",
    name: "cool",
    description: "group description sfsfs sdsd",
  },
  {
    id: "19",
    name: "coolest",
    description: "group description sfsfs sdsd",
  },
];

console.log(compareArraysByProperty(arr, arr2, 'name'));
