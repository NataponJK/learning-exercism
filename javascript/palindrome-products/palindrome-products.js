//
// This is only a SKELETON file for the 'Palindrome Products' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Palindromes {
  static generate({ minFactor, maxFactor}) {
    if (minFactor > maxFactor) {
      throw new Error('min must be <= max');
    }
    let smallest = { value: null, factors: [] };
    let largest = { value: null, factors: [] };

    const isPalindrome = (num) => {
      const str = num.toString();
      let left = 0;
      let right = str.length - 1;
      while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
      }
      return true;
    }
    for (let i = minFactor; i <= maxFactor; i++) {
      for (let j = i; j <= maxFactor; j++) {
        
        const product = i * j;

        if (isPalindrome(product)) {
          if (smallest.value === null || product < smallest.value) {
            smallest.value = product;
            smallest.factors = [[i, j]];
          } else if (product === smallest.value) {
            smallest.factors.push([i, j]);
          }

          if (largest.value === null || product > largest.value) {
            largest.value = product;
            largest.factors = [[i, j]];
          } else if (product === largest.value) {
            largest.factors.push([i, j]);
          }
        }
      }
    }
    return { smallest, largest };
  }
}
