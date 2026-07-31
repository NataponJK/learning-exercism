export class List {
  public readonly elements: number[];

  constructor(...elements: number[]) {
    this.elements = elements;
  }

  public compare(otherList: List): 'equal' | 'sublist' | 'superlist' | 'unequal' {
    const listA = this.elements;
    const listB = otherList.elements;

    const lenA = listA.length;
    const lenB = listB.length;

    if (lenA === lenB) {
      return this.isSublist(listA, listB) ? 'equal' : 'unequal';
    }

    if (lenA < lenB) {
      return this.isSublist(listA, listB) ? 'sublist' : 'unequal';
    }

    //Len A > LenB
    return this.isSublist(listB, listA) ? 'superlist' : 'unequal';
  }

  private isSublist(sub: number[], main: number[]): boolean {
    if (sub.length === 0) return true;
    if (sub.length > main.length) return false;

    for (let i = 0; i <= main.length - sub.length; i++) {
      let match = true;

      for (let j = 0; j < sub.length; j++) {
        if (main[i + j] !== sub[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  }
}
