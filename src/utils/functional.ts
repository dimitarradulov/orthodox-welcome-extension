export const getRandomElement = (arr: any[] | readonly any[]) => {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const differenceWith = <T>(
  arr1: T[],
  arr2: T[],
  comparator: (a: T, b: T) => boolean
): T[] => {
  return arr1.filter(
    (item1) => !arr2.some((item2) => comparator(item1, item2))
  );
};
