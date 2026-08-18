//
// This is only a SKELETON file for the 'Custom Set' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class CustomSet {
  constructor(element = []) {
    this.elements = Array.from(new Set(element));
  }

  empty() {
    return this.elements.length === 0;
  }

  contains(element) {
    return this.elements.includes(element);
  }

  add(element) {
    if (!this.contains(element)) {
      this.elements.push(element);
    }
    return this;
  }

  subset(otherSet) {
    return this.elements.every(element => otherSet.contains(element));
  }

  disjoint(otherSet) {
    return this.elements.every(element => !otherSet.contains(element));
  }

  eql(otherSet) {
    if (this.elements.length !== otherSet.elements.length) {
      return false;
    }
    return this.subset(otherSet);
  }

  union(otherSet) {
    const combinedElements = [...this.elements, ...otherSet.elements];
    return new CustomSet(combinedElements);
  }

  intersection(otherSet) {
    const commonElements = this.elements.filter(element => otherSet.contains(element));
    return new CustomSet(commonElements);
  }

  difference(otherSet) {
    const uniqueElements = this.elements.filter(element => !otherSet.contains(element));
    return new CustomSet(uniqueElements);
  }
}
