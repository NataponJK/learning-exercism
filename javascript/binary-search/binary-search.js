//
// This is only a SKELETON file for the 'Binary Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const find = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];
    if (midValue === target) {
      return mid;
    }
    if (midValue > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  throw new Error('Value not in array');
};
