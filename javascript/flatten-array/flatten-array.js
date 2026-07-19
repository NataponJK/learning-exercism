//
// This is only a SKELETON file for the 'Flatten Array' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const flatten = (array) => {
  return array.flat(Infinity)
              .filter((element) => element !== null && element !== undefined);
};
