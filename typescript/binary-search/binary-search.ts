export function find(array: number[], target: number): number | never {
  let left: number = 0;
  let right: number = array.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    const midValue: number = array[mid];

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
}
