
export const getUniqueListBy = <T>(arr: Array<T>, key: keyof T): Array<T> => {
  const map = new Map<T[keyof T], T>();
  arr.forEach(item => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
};