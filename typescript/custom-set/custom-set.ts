export class CustomSet<T> {
  private elements: T[];

  constructor(initial: T[] = []) {
    this.elements = [];
    for (const element of initial) {
      this.add(element);
    }
  }

  empty(): boolean {
    return this.elements.length === 0;
  }

  contains(element: T): boolean {
    return this.elements.includes(element);
  }

  add(element: T): this {
    if (!this.contains(element)) {
      this.elements.push(element);
    }
    return this;
  }

  subset(other: CustomSet<T>): boolean {
    return this.elements.every((element) => other.contains(element));
  }

  disjoint(other: CustomSet<T>): boolean {
    return !this.elements.some((element) => other.contains(element));
  }

  eql(other: CustomSet<T>): boolean {
    if (this.elements.length !== other.elements.length) {
      return false;
    }
    return this.subset(other);
  }

  union(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet([...this.elements, ...other.elements]);
  }

  intersection(other: CustomSet<T>): CustomSet<T> {
    const commonElements = this.elements.filter((element) => other.contains(element));
    return new CustomSet(commonElements);
  }

  difference(other: CustomSet<T>): CustomSet<T> {
    const uniqueElements = this.elements.filter((element) => !other.contains(element));
    return new CustomSet(uniqueElements);
  }
}
