//
// This is only a SKELETON file for the 'Sublist' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class List {
  constructor(elements = []) {
    this.elements = elements || [];
  }

  compare(otherList) {
    const listA = this.elements;
    const listB = otherList ? otherList.elements : [];

    const lenA = listA.length;
    const lenB = listB.length;

    if (lenA === lenB) {
      return this.isSublist(listA, listB) ? 'EQUAL' : 'UNEQUAL';
    }
    
    if (lenA < lenB) {
      return this.isSublist(listA, listB) ? 'SUBLIST' : 'UNEQUAL';
    }
    
    if (lenA > lenB) {
      return this.isSublist(listB, listA) ? 'SUPERLIST' : 'UNEQUAL';
    }
  }

  isSublist(sub, main) {
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
