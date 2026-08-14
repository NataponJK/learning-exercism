//
// This is only a SKELETON file for the 'Strain' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const keep = (collection, predicate) => {
  const result = [];
  for (const element of collection) {
    if (predicate(element)) result.push(element);
  }
  return result;
};

export const discard = (collection, predicate) => {
  return keep(collection, (element) => !predicate(element));
};
