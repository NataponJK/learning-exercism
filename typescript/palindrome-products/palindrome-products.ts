export interface Input {
  maxFactor: number
  minFactor?: number
}

export interface Palindrome {
  value: number | null;
  factors: [number, number][];
}

export interface Output {
  smallest: Palindrome;
  largest: Palindrome;
}

function isPalindrome(num: number): boolean {
  const str = num.toString();
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}


export function generate({ maxFactor, minFactor = 1}: Input): Output {
  if (minFactor > maxFactor) {
    throw new Error('min must be <= max');
  }
  
  let smallestValue: number | null = null;
  let smallestFactors: [number, number][] = [];

  let largestValue: number | null = null;
  let largestFactors: [number, number][] = [];

  for (let i = minFactor; i <= maxFactor; i++) {
    for (let j = i; j <= maxFactor; j++) {
      const product = i * j;
      if (isPalindrome(product)) {
        if (smallestValue === null || product < smallestValue) {
          smallestValue = product;
          smallestFactors = [[i, j]];
        } else if (product === smallestValue) {
          smallestFactors.push([i, j]);
        }

        if (largestValue === null || product > largestValue) {
          largestValue = product;
          largestFactors = [[i, j]];
        } else if (product === largestValue) {
          largestFactors.push([i, j]);
        }
      }
    }
  }

  return {
    smallest: { value: smallestValue, factors: smallestFactors },
    largest: { value: largestValue, factors: largestFactors }
  };
}
