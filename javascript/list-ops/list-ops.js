//
// This is only a SKELETON file for the 'List Ops' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class List {
  constructor(values = []) {
    this.values = values;
  }

  append(otherList) {
    return new List([...this.values, ...otherList.values]);
  }

  concat(otherList) {
    let result = [...this.values];
    for (const list of otherList.values) {
      result = [...result, ...list.values];
    }
    return new List(result);
  }

  filter(predicate) {
    const result = [];
    for (const item of this.values) {
      if (predicate(item)) {
        result[result.length] = item;
      }
    }
    return new List(result);
  }

  map(callback) {
    const result = [];
    let i = 0;
    for (const item of this.values) {
      result[i] = callback(item);
      i++;
    }
    return new List(result);
  }

  length() {
    let count = 0;
    for (const _ of this.values) {
      count++;
    }
    return count;
  }

  foldl(callback, initialAccumulator) {
    let accumulator = initialAccumulator;
    for (const item of this.values) {
      accumulator = callback(accumulator, item);
    }
    return accumulator;
  }

  foldr(callback, initialAccumulator) {
    let accumulator = initialAccumulator;
    for (let i = this.length() - 1; i >= 0; i--) {
      accumulator = callback(accumulator, this.values[i]);
    }
    return accumulator;
  }

  reverse() {
    const result = [];
    let i = 0;
    for (let j = this.length() - 1; j >= 0; j--) {
      result[i] = this.values[j];
      i++;
    }
    return new List(result);
  }
}
